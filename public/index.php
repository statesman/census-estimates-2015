<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <?php
  $meta = array(
    "title" => "2016 Census population estimates | Statesman.com",
    "description" => "Austin continues to grow XXXXXXXX.",
    "thumbnail" => "http://projects.statesman.com/news/census-population-2016/assets/share.png", // needs update
    "shortcut_icon" => "http://media.cmgdigital.com/shared/media/2015-11-16-11-32-05/web/site/www_mystatesman_com/images/favicon.ico",
    "apple_touch_icon" => "http://media.cmgdigital.com/shared/theme-assets/242014/www.statesman.com_fa2d2d6e73614535b997734c7e7d2287.png",
    "url" => "http://projects.statesman.com/news/census-population-2016/",
    "twitter" => "statesman"
  );
?>

  <title>Interactive: <?php print $meta['title']; ?> | Austin American-Statesman</title>
  <link rel="shortcut icon" href="<?php print $meta['shortcut_icon']; ?>" />
  <link rel="apple-touch-icon" href="<?php print $meta['apple_touch_icon']; ?>" />

  <link rel="canonical" href="<?php print $meta['url']; ?>" />

  <meta name="description" content="<?php print $meta['description']; ?>">

  <meta property="og:title" content="<?php print $meta['title']; ?>"/>
  <meta property="og:description" content="<?php print $meta['description']; ?>"/>
  <meta property="og:image" content="<?php print $meta['thumbnail']; ?>"/>
  <meta property="og:url" content="<?php print $meta['url']; ?>"/>

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@<?php print $meta['twitter']; ?>" />
  <meta name="twitter:title" content="<?php print $meta['title']; ?>" />
  <meta name="twitter:description" content="<?php print $meta['description']; ?>" />
  <meta name="twitter:image" content="<?php print $meta['thumbnail']; ?>" />
  <meta name="twitter:url" content="<?php print $meta['url']; ?>" />

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="dist/style.css">

  <link href='http://fonts.googleapis.com/css?family=Lusitana:400,700' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Merriweather+Sans:400,300,300italic,400italic,700italic,700,800,800italic' rel='stylesheet' type='text/css'>


  <?php /* CMG advertising and analytics */ ?>
  <?php include "includes/advertising.inc"; ?>
  <?php include "includes/metrics-head.inc"; ?>

</head>
<body>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

        <a class="navbar-brand" href="http://www.statesman.com/" target="_blank">
        <img class="visible-xs visible-sm" width="103" height="26" src="assets/logo-short-black.png" />
        <img class="hidden-xs hidden-sm" width="273" height="26" src="assets/logo.png" />
        </a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="./">Home <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="visible-xs small-social"><a target="_blank" href="https://www.facebook.com/sharer.php?u=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-facebook-square"></i></a><a target="_blank" href="https://twitter.com/intent/tweet?url=<?php echo urlencode($meta['url']); ?>&via=<?php print urlencode($meta['twitter']); ?>&text=<?php print urlencode($meta['title']); ?>"><i class="fa fa-twitter"></i></a><a target="_blank" href="https://plus.google.com/share?url=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-google-plus"></i></a></li>
      </ul>
        <ul class="nav navbar-nav navbar-right social hidden-xs">
          <li><a target="_blank" href="https://www.facebook.com/sharer.php?u=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-facebook-square"></i></a></li>
          <li><a target="_blank" href="https://twitter.com/intent/tweet?url=<?php echo urlencode($meta['url']); ?>&via=<?php print urlencode($meta['twitter']); ?>&text=<?php print urlencode($meta['title']); ?>"><i class="fa fa-twitter"></i></a></li>
          <li><a target="_blank" href="https://plus.google.com/share?url=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-google-plus"></i></a></li>
        </ul>
    </div>
  </div>
</nav>

  <article>

      <div class="container">

    <div class="row">
      <div class="col-lg-12 interactive-header">
      <h1 id="pagetitle">Title</h1>
      <p class="author">By So Andso</p>
      <p>

net migration into Austin MSA, 2015 compared to 2014

growth rate rank among large metro areas - growth, 2014-15, or whatever -- bar chart


png - dot for every person?

density compared with other MSAs -- also, how has that changed over time? are we able to say anything interesting about this?


      </p>

      <a href="/" class="btn btn-primary" role="button" style="background-color:#395271;">Read more&emsp;<i class="fa fa-chevron-right"></i></a>
      </div>
    </div>

<div id="chart_div">
    <h3>Some sort of headline here</h3>
    <p>blah blah blah leads the way among large metro areas in the U.S.</p>
    <div id="chart"></div>
    <p class="small note">Source: U.S. Census Bureau</p>
</div>

</div>


<script type="text/html" id="chart_template">
    <div class="row barscale_wrap">
        <div class="col-md-4 col-md-offset-3 barscale">
            <p class="small pull-left barscale_text">
                0%
            </p>
            <p class="small pull-right barscale_text">
                <%= t_data.barscale %>
            </p>
        </div>
    </div>
    <% _.each(t_data, function(d) { %>
          <div class="row bar-wrapper">
              <div class="col-xs-12 col-md-3">
                  <span class="city_deets"><%= d.city %>: <%= d.pct %></span>
              </div>
              <div class="col-xs-12 col-md-4 barchart">
                    <div class="row">
                        <div class="bar-container">
                            <div class="bar" style="width:<%= d.barwidth %>%;"></div>
                        </div>
                    </div>
              </div>
          </div>
    <% }); %>
</script>

<div id="us_map_div">
    <div class="container">
    <h3>Some sort of headline here</h3>
    <p>blah blah blah leads the way among large metro areas in the U.S. Hover or tap on a county to see XXXX.</p>
        <div class="row">
            <div class="col-xs-12 col-md-9">
                <div id="us_legend">
                    <small>Population change, 2010-2014</small>
                </div>
                <div id="us_map"></div>
            </div>
            <div class="col-xs-12 col-md-3">
                <div id="us_hover_output"></div>
            </div>
        </div>
    </div>
</div>

<div id="tx_map_div">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-9">
                <div id="tx_legend">
                    <small>Percent change in population, 2010-2014</small>
                </div>
                <div id="tx_map"></div>
            </div>
            <div class="col-xs-12 col-md-3">
                <div id="tx_hover_output"></div>
            </div>
        </div>
    </div>
</div>

  </article>

    <!-- bottom matter -->
    <?php include "includes/banner-ad.inc";?>
    <?php include "includes/legal.inc";?>
    <?php include "includes/project-metrics.inc"; ?>
    <?php include "includes/metrics.inc"; ?>

    <script src="dist/scripts.js"></script>

  <?php if($_SERVER['SERVER_NAME'] === 'localhost'): ?>
    <script src="//localhost:35729/livereload.js"></script>
  <?php endif; ?>
</body>
</html>
