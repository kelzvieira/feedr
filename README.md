Welcome to Feedr!

This version of Feedr aggregates three popular ... I guess you can call them social news websites? Whatever you lump them as, here you'll be able to read the latest from Reddit, Buzzfeed and Mashable.

Notes on the feeds:
– all feeds have no authentication, they're 100% public. This means there are a few ... quirks.

Notes on Buzzfeed's feed:
– Buzzfeed doesn't list impression counts for any of their newer articles.
– Buzzfeed separates their API into 'big_stories' and 'buzzes', but the 'big_stories' are consistent across their API pagination (ie. no mater what page you go on, the big_stories are always the same). Because of this, I have used the 'buzzes' instead, despite not having the impression numbers
– Buzzfeed's API doesn't have any official, up-to-date documentation so it was hard to find out what sort of pagination they used (if any) and sorting features they had. I don't think they have any time-related sort options so the results in this feed are sporadic (chronologically speaking).
– Buzzfeed does have a 'trending' API endpoint which includes recent 'buzzes', but this is limited to only 3 pages of content (which is why I have excluded it).

Notes in Mashable's API:
– Mashable also doesn't have any up-to-date, official documentation but it seems more structured than others. The results are not time-bound but they seem to be quite recent when you paginate.

Notes on Reddit's API:
– Reddit has tons of options on their public API and it's all neatly documented here: https://www.reddit.com/dev/api/
– Reddit also has too many options that makes it a bit difficult to standardise the content. This is why most of the reddit articles featured in this feed do not have preview's set – it's not a requirement for reddit posts to have anything except a title. In some cases, the self.text is included as a description / continuation of the content, but often the point of a reddit post is to link out to a news website, YouTube video, Imgur gallery, etc.

For now, the search bar is limited to searching through titles of posts (not descriptions, source names, post dates, etc.) but it does update as you type. If you've loaded more articles than the default / initial view, this can take some time to filter (and the loader isn't working 100% there).

Loading new articles at the bottom of the current active feed will fetch the next page of all 3 feeds and push these posts to the end of your current view. Existing articles will still be visible which means if you load more articles too many times, you will likely get a very slow experience. Eventually, it would be cool to run fetches backwards (ie. remove articles from the feed after every new api call but then unshift them back on scroll up), but that's V2 (or 12 ...).
