---
layout: page
title: Home
id: home
permalink: /
---

<strong style="font-weight:500;">About</strong>

<p style="color:#6f6e69;">I'm Akram! an applied researcher with a passion for Machine Learning & Geospatial Analysis. I worked on crop mapping using satellite data, extreme weather featurization, post-processing weather forecasts, and data-centric machine learning. I am deeply interested in neural-nets, weak supervision, and foundation models. You can check my work on <a href="https://github.com/Akramz">Github</a> and <a href="https://scholar.google.com/citations?user=m1J5OaIAAAAJ&hl=en&authuser=2">Scholar</a>.</p>

<strong style="font-weight:500;">Writing</strong>
<ul>
  {% assign recent_notes = site.notes | sort: "last_modified_at_timestamp" | reverse %}
  {% for note in recent_notes limit: 5 %}
    <li>
      {{ note.last_modified_at | date: "%y · %m" }} — <a class="internal-link" href="{{ site.baseurl }}{{ note.url }}">{{ note.title }}</a>
    </li>
  {% endfor %}
</ul>

<style>
  .wrapper {
    max-width: 46em;
  }
</style>
