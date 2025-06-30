import openai
import pandas as pd
import json
import time
import datetime
import os

# Your credentials
openai.api_key = os.environ.get('openai_apikey')
ASSISTANT_ID = 'asst_kRMqSm8caWwK6ITz4XA1dMqX'


def read_excel(file_path):
    return pd.read_excel(file_path)


def format_dataframe_for_assistant(df):
    return df.to_dict(orient='records')


def batch_events(records, batch_size=10):
    for i in range(0, len(records), batch_size):
        yield i // batch_size + 1, records[i:i + batch_size]


def create_or_get_thread():
    """Create and return a single thread for all batches"""
    thread = openai.beta.threads.create()
    print(f"🧵 Thread created: {thread.id}")
    return thread.id


def send_batch_to_assistant(thread_id, batch_num, batch_data, timeout_seconds=300):
    prompt = f"""
Batch #{batch_num}: Process the following tech events and return a JSON list where each event has:
Respond only in strict JSON array format.

Here is the data:
""" + json.dumps(batch_data, indent=2)

    openai.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=prompt
    )

    run = openai.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id=ASSISTANT_ID
    )

    # Poll for completion
    start_time = datetime.datetime.now()
    while True:
        run_status = openai.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)
        elapsed = (datetime.datetime.now() - start_time).total_seconds()

        if run_status.status == "completed":
            print(f"✅ Batch {batch_num} completed in {int(elapsed)}s")
            break
        elif run_status.status in ["failed", "cancelled", "expired"]:
            raise Exception(f"❌ Batch {batch_num} failed with status: {run_status.status}")
        elif elapsed > timeout_seconds:
            raise TimeoutError(f"⏱ Batch {batch_num} timed out after {timeout_seconds}s.")

        time.sleep(3)

    messages = openai.beta.threads.messages.list(thread_id=thread_id)
    latest_message = messages.data[0].content[0].text.value
    return latest_message


def save_final_output(data, output_file):
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def main():
    input_excel = "Updated India DevEvents links.xlsx"
    output_json = "batched_events_output_india_june.json"
    batch_size = 10
    timeout = 300

    df = read_excel(input_excel)
    records = format_dataframe_for_assistant(df)
    thread_id = create_or_get_thread()
    final_data = []

    for batch_num, batch in batch_events(records, batch_size):
        print(f"\n🚀 Processing batch {batch_num} ({len(batch)} events)...")
        try:
            response = send_batch_to_assistant(thread_id, batch_num, batch, timeout)
            try:
                parsed = json.loads(response)
                final_data.extend(parsed)
            except json.JSONDecodeError:
                print(f"⚠️ Batch {batch_num} returned invalid JSON. Saving raw.")
                final_data.append({"batch": batch_num, "raw_response": response})
        except TimeoutError as e:
            print(str(e))
            final_data.append({"batch": batch_num, "raw_response": "Timed out"})
        except Exception as e:
            print(f"❌ Error in batch {batch_num}: {e}")
            final_data.append({"batch": batch_num, "raw_response": str(e)})

    save_final_output(final_data, output_json)
    print(f"\n📁 All done! Results saved to: {output_json}")


if __name__ == "__main__":
    main()
