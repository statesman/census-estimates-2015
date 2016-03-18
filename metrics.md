How we do statesman.com metrics
==========================

By Christian McDonald, 2015-11-19 update.

Darius asked for some explanation about how we use sitecatalyst tags in our projects. I'll try to offer some background here.

When I started doing this, I just lifted the sitecatalyst code from an existing statesman.com page and tried to make it work. Then I worked with someone at CMG (maybe Jennifer White, is she still there?) to make sure it fired properly. We also worked to get chartbeat and quantcast code included. This was in early 2014 at the latest. I would think it would need updating, but I just checked (3/5/2015) statesman.com and the notes claim the same 25.5 version of Sitecatalyst. Regardless, I'm sure it could use updating if we could get the attention of the right peoplel at CMG.

## How our projects are structured

Regardless of the technology used (php, node, etc) we tend to pull our metrics files in through some kind of "include" technology.

I'll use our [single-page-project](https://github.com/statesman/single-page-project/) template to illustrate.

### In the <head>

It starts this bit of code in the head: [metrics_head.inc](https://github.com/statesman/single-page-project/blob/master/public/includes/metrics-head.inc)

Both Chartbeat and Quantcast require code both in the <head> of a file and then just before the </body>. So we include this file in our head to get this started.

You can see this on line 48 of our [single-page-project](https://github.com/statesman/single-page-project/blob/master/public/index.php#L48). (L48 at least as of this writing).

This code doesn't change, so we just include it.

### The metrics code

The `metrics.inc` is the most important one, in that it has all the code that fires for SiteCatalyst, Quantcast and Chartbeat as the bottom of the page is read. I structured this page so it also doesn't have to change per project. Instead, before you include this on your page, you include `project_metrics.inc`.

### Project metrics

[project_metrics.inc](https://github.com/statesman/single-page-project/blob/master/public/includes/project-metrics.inc) is the only file that changes from project to project. It sets up to four variables that are then used later in the `metrics.inc` file.

* projectSite: the site name. For us that is statesman, austin360 or mystatesman
* projectChannel: is the main category
* projectCategory: is a sub category if needed
* projectSubCategory: is a name for a specific project
* projectByline: is lower case name of reporter. "james barragan, tony plohetski, jazmine ulloa"


### Improvements needed

* While projectByline has been added, it should probably pull from a single place on the page instead of being repeated in `project-metrics.inc`
* We now use chartbeat "publisher" which has some additional code to capture more material. I've never implemented it.
* There are probably other issues or improvement that could be made if we could reach the right person at CMG Audience/Development.


