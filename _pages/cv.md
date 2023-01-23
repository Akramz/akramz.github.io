---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* Bachelor in Applied Math. & Informatics, Abdelmalek Essaâdi University, Tangier, 2012
* Masters in Information Systems, Faculté des Sciences et Techniques de Tanger, 2016
* Doctorate in Informatics, Faculté des Sciences et Techniques de Tanger, 2020

Work experience
======
* Dec 2021 - Present: Research Staff Member
  * IBM Research
  * Current: I co-lead a research challenge focused on building IBM Environmental Intelligence Suite’s CIMF & PAIRS++ toolkits for large-scale climate informatics (ref: article). I built & integrated utilities for Geospatial data discovery (PAIRS++ & STAC catalog exploration, data preprocessing, and acquisition) and modeling tasks (the CIMF framework for managing ML workflows).
  * Current: building models for climate hazard impact estimation. Methods: Impact functions, change detection.
  * I built ML-based probabilistic models for sub-seasonal-to-seasonal (S2S) climate forecast post-processing (methods: neural nets, natural gradient boosting, bayesian methods) by combining different sources of predictability.
  * I modeled S2S climate extremes using rule-based and learning methods. This work stream covers both climate extreme featurization and risk estimation.
* Nov 2020 - Nov 2021: Postdoctoral Researcher
  * IBM Research
  * I collaborated with KUMWE to provide seasonal maize presence maps in Rwanda. I fused period-based satellite imagery (Sentinel-1 & Sentinel-2) and used ensemble learning methods to solve two machine learning tasks (crop presence & maize potential).
  * I investigated the role of extreme weather events (and esp. indices) on agricultural yield variation. I used a standard set of extreme weather indices that quantify extreme weather severity for floods and droughts coupled with explainable AI algorithms to explain maize yield variation in Iowa.
  * I investigated ECMWF S5's skill in predicting extreme temperature and precipitation quantile categories ahead of the S2S competition.
* Aug 2020 - Oct 2020: Machine Learning Engineer
  * Tanger-Med
  * I built fraud detection systems using weakly-supervised and unsupervised anomaly detection methods based on time-series data (methods: auto- encoders, isolation forests, LSTMs).
* Jun 2019 - Sep 2019: Research Intern
  * IBM Research
  * I collaborated with Hello Tractor to use satellite imagery for small-scale digital farm twinning (resulted in an ICLR 2020 submission).

  
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
* Member of the CCAI Review Committee: Climate Change AI Innovation Grants (2021’).
* Member of the Review Committee: Deep Learning Indaba (2019/2022).
