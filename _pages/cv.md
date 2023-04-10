---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Work experience
======
* March 23’ — ... : Senior Applied Scientist • Microsoft Research
  * I am part of the [AI4G team](https://www.microsoft.com/en-us/research/group/ai-for-good-research-lab/) working on large-impact GeoSpatial problems.
* December 21’ — February 23’: Research Staff Member • IBM Research
  * I led a project focused on building [EIS](https://www.ibm.com/products/environmental-intelligence-suite/geospatial-analytics)’s CIMF & PAIRS toolkits for climate informatics (ref: [article](https://research.ibm.com/blog/ai-for-climate-change-adaptation)).
  * I built ML probabilistic models for S2S climate forecast post-processing (ref: [EGU 2022](https://meetingorganizer.copernicus.org/EGU22/EGU22-11063.html)).
  * I modeled S2S climate extremes covering climate extreme featurization and risk estimation (ref: [EGU 2022](https://meetingorganizer.copernicus.org/EGU22/EGU22-12461.html)).
* November 20’ — November 21’: Postdoctoral Researcher • IBM Research
  * I fused Sentinel-1 & Sentinel-2 and used ensemble learning to solve two ML tasks (crop & maize mapping). 
  * I investigated extreme weather events on agricultural yield variation (ref: [INFORMS](https://research.ibm.com/publications/climate-aware-forecasting-of-agricultural-produce-across-large-regions), [AGU](https://ui.adsabs.harvard.edu/abs/2021AGUFM.H53C..03D/abstract))
  * I investigated ECMWF S5's skill in predicting extreme temperature and precipitation events (ref: [S2S competition](https://s2s-ai-challenge.github.io/)).
 
Skills
======
* Machine Learning
* Computer Vision
* GeoSpatial Data Science
* Software Engineering

Publications
======
  <ul>{% for post in site.publications %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
  <ul>{% for post in site.talks %}
    {% include archive-single-talk-cv.html %}
  {% endfor %}</ul>
  
Service and leadership
======
* **Program committee member**: The 3rd workshop on Practical ML for Developing Countries at ICLR 2022.
* **Member of the CCAI Review Committee**: Climate Change AI Innovation Grants (2021 & 2023).
* **Member of the Review Committee**: Deep Learning Indaba (2019, 2022, & 2023).
