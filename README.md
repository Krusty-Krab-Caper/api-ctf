# The Secret Formula 

In the bustling underwater city of Bikini Bottom, the Krusty Krab was known for its delicious Krabby Patty, a burger so scrumptious that its secret formula was a closely guarded treasure. Mr. Krabs, the crustacean owner, had recently digitized his operations, including the recipe’s safekeeping, through an API that connected to his vault.

Plankton, the tiny but ambitious owner of the rival restaurant, the Chum Bucket, had tried every trick in the book to get his hands on the coveted formula, to no avail. But when he heard about the Krusty Krab’s new digital system, a devious plan formed in his microscopic mind.

## Chapter 1: The Directory

One gloomy evening, Plankton sat hunched over his computer, his single eye flickering with the screen's glow. "Karen, my computer wife, analyze the Krusty Krab's API endpoints," he commanded.

Karen's circuits hummed as she scanned the digital infrastructure of the Krusty Krab. "Plankton, it seems they've overlooked the security on their `/directory` endpoint. There's no authentication!"

A wicked smile spread across Plankton's face. "At last, the Krabby Patty secret formula will be mine!"

Karen continued, "the `/directory` endpoint seems to contain basic information about the employees at the Krusty Krab's IT Department. It's accessed at their directory website."

Upon locating the site, Plankton discovered that it was designed to retreive directory information by employee name. He put his own name, "Plankton" into the search bar and saw via the network tab in his browser that the following request is made: `http://localhost:8080/directory?id=0bafc1bbb34ddbf6f55935063bf51f50f8d775e6`. He also sees the following response:

```json
{
    "code": 404,
    "message": "Not Found"
}
```

He notices that the frontend is created very poorly and runs too slowly to make a lot of queries. He decides to rely on the underlying API to do his dirty work.

Rubbing his scheming, microbial hands together, Plankton devised a plan to find information to aid him in his heist... perhapes an identifier for someone important?

#### _Helpful Information_

- The endpoint you'll be using is `http://localhost:8080/directory`
- There are 100 employees in the Krusty Krab IT department.
- You may need to write some code to help you. 
- There are no rate limits.