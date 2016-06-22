<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <?php
  $meta = array(
    "title" => "2015 Census estimates | Statesman.com",
    "description" => "Austin and other Texas cities are still growing like weeds.",
    "thumbnail" => "http://projects.statesman.com/news/census/estimates-2015/assets/sharegif.gif",
    "shortcut_icon" => "http://media.cmgdigital.com/shared/media/2015-11-16-11-32-05/web/site/www_mystatesman_com/images/favicon.ico",
    "apple_touch_icon" => "http://media.cmgdigital.com/shared/theme-assets/242014/www.statesman.com_fa2d2d6e73614535b997734c7e7d2287.png",
    "url" => "http://projects.statesman.com/news/census/estimates-2015/",
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
        <li><a href="../">More Census projects</a></li>
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

      <div class="interactive-header white">
      <div class="container">
          <h4>2015 Census estimates</h4>
      <h1 id="pagetitle">Population data show rapid growth rate</h1>
      <p class="author">Interactive by Cody Winchester and Christian McDonald, American-Statesman
          <br>
          Published March 24, 2016
      </p>
      <p>
          A glance across our skyline or a drive up MoPac (good luck with that!) is all we need to see that Central Texas is growing like a playful Labrador puppy. But today, the U.S. Census Bureau released new statistics confirming what those big puppy paws told us would happen: We're growing awfully fast.
      </p>
</div>
</div>


<div id="chart_div" class="interactive-header">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">

    <h3 class="bold">Austin 2.0 (million)</h3>

    <p>The Austin metro area is now home to more than 2 million people, according to the Census Bureau estimates. By population, we're only the 32nd largest metro area in the United States. But among metro areas with more than 1 million people, we've been the fastest-growing metro area five years running.</p>

    <p>From July 2014 to July 2015, the Austin-Round Rock metropolitan statistical area, which includes Travis, Williamson, Hays, Bastrop and Caldwell counties, grew from 1,943,465 to 2,000,860 people, a 3 percent bump. Since 2010, the five-county area has grown by 15.8 percent.<p>
    <p><a href="http://www.mystatesman.com/news/news/local/austin-metro-area-surpasses-2-million-residents/nqrQF/" target="_blank" class="bold"> &raquo; Related: Austin metro area surpasses 2 million residents</a></p>
        <div class="alert alert-custom bold" role="alert">Use the slider to compare growth rates between years.</div>
            <div class="slider" id="msa_slider"></div>
    <h4 id="year_hed">Growth from 2014-2015</h4>
    <div id="chart"></div>
    <p class="small note">Source: U.S. Census Bureau</p>
</div>
</div>
</div>
</div>


<script type="text/html" id="chart_template">
    <div class="row barscale_wrap">
        <div class="col-xs-12 col-md-4 col-md-offset-6 barscale">
            <p class="small pull-left barscale_text">
                0%
            </p>
            <p class="small pull-right barscale_text" style="margin-right:-10px;">
                <%= t_data.barscale %>
            </p>
            <div class="clearfix"></div>
    </div>
    </div>
    <% _.each(t_data, function(d) { %>
          <div class="row bar-wrapper">
              <div class="col-xs-12 col-md-6 msa_deet_wrap">
                  <span class="city_deets<% if ( d.msa.toUpperCase() === 'AUSTIN-ROUND ROCK, TX' ) { %> bold<% }; %>"><%= d.msa %></span>
              </div>
              <div class="col-xs-12 col-md-4 barchart">
                    <div class="bar-container">
                        <div class="bar whitetext <% if ( d.msa.toUpperCase() === 'AUSTIN-ROUND ROCK, TX' ) { %>bar-austin<% } else { %>bar-reg<% }; %>" style="width:<%= d.barwidth %>%;"><%= d.pct_change %></div>
                    </div>
              </div>
          </div>
    <% }); %>
</script>

<script type="text/html" id="map_table_template">
    <table class="table table-condensed">
        <thead>
        <tr>
            <th></th>
            <th><%= t_data.oldyear.year %></th>
            <th><%= t_data.newyear.year %></th>
            <th>Change</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th class="bold"><%= t_data.county %></th>
            <td><%= t_data.oldyear.val %></td>
            <td><%= t_data.newyear.val %></td>
            <td><%= t_data.pct_change %></td>
        </tr>
        <% if (t_data.texas) { %>
        <tr>
            <th class="bold">Texas</th>
            <td><%= t_data.texas.oldyear %></td>
            <td><%= t_data.texas.newyear %></td>
            <td><%= t_data.texas.pct_change %></td>
        </tr>
        <% }; %>
        </tbody>
    </table>
</script>

<div id="tx_map_div" class="interactive-header">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
        <h3 class="bold">Texas tops in total growth</h3>
            <p>Austin isn't the only Texas area seeing phenomenal growth. The state's four largest metro areas (Houston, Dallas/Fort Worth, San Antonio and Austin areas) added more people than any other state as whole (other than Texas, of course).</p>

            <p>From July 2014 to July 2015, five Texas counties were among the fastest-growing large counties (100,000+) in the country: Hays (2), Fort Bend (3), Comal (6), Montgomery (8), Williamson (9). Loving County, in West Texas, was the fastest growing county in America in 2015, adding 25 people for a whopping total of 112. Hey, that's 35 percent growth!</p>
            <p><a href="http://www.mystatesman.com/news/news/local/will-austin-san-antonio-become-the-next-dfw/nqrFw/" target="_blank" class="bold"> &raquo; Related: Will Austin-San Antonio become the next DFW?</a></p>
        <div class="alert alert-custom bold" role="alert">Use the slider to compare growth rates between years. Hover or tap on a county to show more details.</div>

                <div class="slider" id="tx_slider"></div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12 col-md-8">
                <span id="tx_legend_note" class="small">Population change, 2014-2015</span>
                <div id="tx_legend"></div>
                <div class="clearfix"></div>
                <div id="tx_map"></div>
            </div>
            <div class="col-xs-12 col-md-4">
                <table id="tx_table" class="table table-condensed">
                    <thead>
                        <tr id="tx_table_header_row">
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="tx_table_row"></tr>
                        <tr id="tx_county_table_row"></tr>
                    </tbody>
                </table>
            </div>
        </div>
    <p class="small">Source: U.S. Census Bureau</p>
    </div>
</div>


<div id="us_map_div" class="interactive-header">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
    <h3 class="bold">U.S.: North Dakota still growing</h3>
            <p>Florida added 365,703 people between July 2014 to July 2015, outpaced only by Texas with 490,036. The Sunshine State also has three counties in the top 10 list of fastest-growing large counties (100,000 or more). And despite the tanking oil market, there's still a lot of green in oil-producing regions like North Dakota, which has been the fastest-growing state for the past couple of years.</p>
        <div class="alert alert-custom bold" role="alert">Use the slider to compare growth rates between years. Hover or tap on a county to show more details.</div>
            <div class="slider" id="us_slider"></div>
        </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-md-8">
                <div class="clearfix"></div>
                <span id="us_legend_note" class="small">Population change, 2014-2015</span>
                <div id="us_legend"></div>
                <div id="us_map"></div>
            </div>
            <div class="col-xs-12 col-md-4">
                <div id="us_hover_output"></div>
            </div>
        </div>
    <p class="small">Source: U.S. Census Bureau. Population numbers for Shannon County, South Dakota, were not included in the data.</p>
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
