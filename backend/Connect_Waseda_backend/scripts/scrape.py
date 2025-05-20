import requests
from bs4 import BeautifulSoup
import json

BASE_URL = "https://www.waseda.jp/inst/icc/news-en/?tag=events-en"
OUTPUT_FILE = "icc_events.json"

def scrape_icc_reports():
    page = 1
    all_events = []

    while True:
        url = f"{BASE_URL}&pg={page}"
        print(f"Scraping page {page}... {url}")

        response = requests.get(url)
        if response.status_code != 200:
            print(f"Page {page} returned status {response.status_code}. Stopping.")
            break

        soup = BeautifulSoup(response.content, "html.parser")
        # Find the column that contains the event slabs
        event_columns = soup.find_all("div", class_="col-sm-12")

        if not event_columns:
            print("No event columns found.")
            break

        for col in event_columns:
            # Find the slab-summary within each column
            summary = col.find("div", class_="slab-summary soft-right soft-half-ends")
            if summary:
                title_tag = summary.find("h4", class_="slab-heading").find("a") if summary.find("h4", class_="slab-heading") else None
                date_tag = summary.find("time", class_="posted-date")
                posted_attr = summary.find("dl", class_="posted-attr")
                tag_links = posted_attr.find("dd").find_all("a") if posted_attr and posted_attr.find("dd") else []

                title = title_tag.get_text(strip=True) if title_tag else "N/A"
                date = date_tag.get_text(strip=True) if date_tag else "N/A"
                tags = [tag.get_text(strip=True) for tag in tag_links]

                all_events.append({
                    "title": title,
                    "date": date,
                    "tags": tags
                })

        page += 1

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_events, f, ensure_ascii=False, indent=2)

    print(f"Saved {len(all_events)} events to {OUTPUT_FILE}")

if __name__ == "__main__":
    scrape_icc_reports()