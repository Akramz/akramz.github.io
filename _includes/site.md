# Akram Zaytar

> Applied research scientist at Microsoft's AI for Good Lab working on geospatial machine learning: satellite imagery to maps for agriculture, disasters, and public goods. This is his personal site: open-source code, papers, and blog posts.

Pages: [About]({{ '/about/' | absolute_url }}) · [Contact]({{ '/contact/' | absolute_url }}) · [Privacy]({{ '/privacy/' | absolute_url }}) · [Sitemap]({{ '/sitemap.xml' | absolute_url }}) · [RSS]({{ '/feed.xml' | absolute_url }})
{%- assign d = site.data.impact %}

## Papers
{% assign papers = d.papers | sort: "date" | reverse -%}
{%- for p in papers %}
- [{{ p.title }}]({{ p.url | absolute_url }}): {{ p.venue }}, {{ p.date | slice: 0, 4 }}{% if p.citations > 0 %}, {{ p.citations }} citations{% endif %}
{%- endfor %}

## Code
{% assign code = d.code | sort: "last" | reverse -%}
{%- for p in code %}
- [{{ p.name }}]({{ p.url | absolute_url }}): {{ p.desc }}{% if p.stars > 0 %} ★ {{ p.stars }}{% endif %}
{%- endfor %}

## Blog
{% for p in site.posts %}
- [{{ p.title }}]({{ p.url | absolute_url }}): {{ p.date | date: "%Y-%m-%d" }}
{%- endfor %}
