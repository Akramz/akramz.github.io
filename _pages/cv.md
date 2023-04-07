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
* March 23’ — Present: Senior Applied Scientist • Microsoft Research
  * I am part of the [AI4G team](https://www.microsoft.com/en-us/research/group/ai-for-good-research-lab/) working on large-impact GeoSpatial problems.
* December 21’ — February 23’: Research Staff Member • IBM Research
  * I led a project focused on building [EIS](https://www.ibm.com/products/environmental-intelligence-suite/geospatial-analytics)’s CIMF & PAIRS toolkits for climate informatics (ref: [article](https://research.ibm.com/blog/ai-for-climate-change-adaptation)).
  * I built ML probabilistic models for S2S climate forecast post-processing (ref: [EGU 2022](https://meetingorganizer.copernicus.org/EGU22/EGU22-11063.html)).
  * I modeled S2S climate extremes. Our work covered both climate extreme featurization and risk estimation (ref: [EGU 2022](https://meetingorganizer.copernicus.org/EGU22/EGU22-12461.html)).
* November 20’ — November 21’: Postdoctoral Researcher • IBM Research
  * I fused period-based satellite imagery (Sentinel-1 & Sentinel-2) and used ensemble learning methods to solve two ML tasks (crop & maize mapping). 
  * I investigated the role of extreme weather events on agricultural yield variation. I used a standard set of extreme weather [indices](http://etccdi.pacificclimate.org/list_27_indices.shtml) that quantify extreme weather severity for floods and droughts coupled with explainable AI algorithms to explain maize yield variation in Iowa (ref: [INFORMS](https://research.ibm.com/publications/climate-aware-forecasting-of-agricultural-produce-across-large-regions), [AGU](https://ui.adsabs.harvard.edu/abs/2021AGUFM.H53C..03D/abstract))
  * I investigated ECMWF S5's skill in predicting extreme temperature and precipitation quantile categories ahead of the [S2S competition](https://s2s-ai-challenge.github.io/).
* August 20’ — October 20’: Machine Learning Engineer • Tangier Med
  * I built fraud detection systems using weakly-supervised and unsupervised anomaly detection methods based on time-series data (methods: auto- encoders, isolation forests, LSTMs).

Education
======
* Doctorate in CS • Faculté des Sciences et Techniques de Tanger
  * Thesis: “Near real-time Neural Pollution Monitoring with Remote Sensors”.
    * I deployed neural systems for time-series weather forecasting and atmospheric inpainting for greenhouse gas monitoring.
    * I built end-to-end data processing pipelines for weather and pollution monitoring.
* Masters in information systems • FSTT 
  * Final project: “Weather Forecasting with Deep Neural Networks” 
    * I built an LSTM-based deep neural network for short-term weather prediction on national scales. The multi-stacked NN introduced a shared dense top-layer that transform encoded representations to numerical estimates.
* Bachelor in Applied Mathematics • UAE
  * Subjects: Probability & Statistics, PDEs, Measure theory, Numerical analysis, Algebraic Topology, Software Engineering.
  
Skills
======
* Machine Learning
* Computer Vision
* GeoSpatial Data Science
* Software Engineering
* Python Scientific Stack

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
  
Teaching
======
  <ul>{% for post in site.teaching %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Service and leadership
======
* Program committee member: The 3rd workshop on Practical ML for Developing Countries at ICLR 2022.
* Member of the CCAI Review Committee: Climate Change AI Innovation Grants (2021 & 2023).
* Member of the Review Committee: Deep Learning Indaba (2019, 2022, & 2023).
