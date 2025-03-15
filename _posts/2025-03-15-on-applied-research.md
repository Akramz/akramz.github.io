---
layout: post
title: "The Hands-on Guide to Applied ML Research"
date: 2025-03-15
categories: how-to
---

After years of working in AI for Social Good, I've collected many practical lessons on conducting effective empirical research for medium-term impact. Recently, I shared these insights with colleagues, and now I want to pass them on to you. Here's my step-by-step approach to applied ML research that actually works. This blog post is specifically designed for early career machine learning practitioners, data scientists, and Ph.D. students looking for a concrete guide to carry a research project from start to finish.

## Step 1: Start with Why

Most research projects start with a specific idea or approach—something that would eventually appear in the "methods" section of a paper. "What if we used reinforcement learning for this?" or "Could we combine these two architectures?" While these technical inspirations are valuable starting points, they're not good starting points. Once you have such an idea, you need to take a step back and frame it within a larger purpose. Every great research project ultimately requires clarity of purpose. Before writing a single line of code or downloading any datasets, you need to deeply understand why you're doing this work. This initial reflection saves countless hours of wandering down unproductive paths later.

Answer these fundamental questions:
- What problem are you solving?
- Why is this problem interesting?
- What's your proposed solution?
- What impact will this solution have?

From these answers, craft 2-5 specific research questions that will guide your work. By research questions, I mean precise, answerable queries that drive your investigation—not vague goals. For example, instead of "improve speech recognition," a research question might be "How does adding background noise to training data affect speech recognition accuracy for non-native speakers?" Good research questions are specific enough to implement and test, yet broad enough to matter.

I've found this exercise transforms vague ideas into focused research. When you begin with a general interest in a broad area, it's easy to become overwhelmed by possibilities. By forcing yourself to articulate specific questions, you narrow your scope to something both meaningful and manageable.

Throughout this guide, we'll be gradually building our paper as we progress through each step. For this first step, your deliverable is the foundation of that paper.

**Deliverable**: A title and abstract (i.e., the 4 answers turned into a paragraph) that encapsulates your research direction.

## Step 2: Check if It's Already Solved

There's a certain thrill in thinking you've discovered an entirely new problem or approach—but chances are, others have at least touched on similar territory. That's not discouraging, because as we start reviewing what others have achieved, new ideas will come to mind and we will identify new research gaps that might excite us even more!

Do thorough literature review—but be smart about it:
- Post your research questions into LLM-powered tools like [Grok](https://grok.com/)'s DeepSearch or [Perplexity](https://www.perplexity.ai/)'s Deep Research to get an overall impression.
- Scan review papers and meta-analyses first—they give you the landscape, you can use:
    - [https://scholar.google.com/](https://scholar.google.com/)
    - [https://www.paperdigest.org/review/](https://www.paperdigest.org/review/)
    - [https://elicit.com](https://elicit.com)
    - [https://researchrabbitapp.com](https://researchrabbitapp.com)
- Look for "awesome lists" and relevant workshop proceedings for latest research.
- Identify key researchers in the field and check their recent work.

Don't try to read everything exhaustively. Read (mostly) abstracts, do deep dives papers that excited most, and use LLMs to have conversations with middle-of-the-ground papers. Focus on identifying trends, highlighting gaps, and developing a coherent narrative about where your work fits.

This approach saved me months of work on multiple occasions. After just a few days of strategic literature review, you might discover that while your problem hasn't been solved, researchers from different fields have addressed pieces of it. Or maybe is has been solved, but after doing literature review, you have now so many more ideas. You can build on previous research rather than reinventing the wheel. Your unique contribution often lies in the synthesis and application of existing ideas to new contexts.

After this step, you'll likely need to refine your research questions.

**Deliverable**: A solid "Related Work" section that positions your research.

## Step 3: Make It Measurable

In applied ML, tangible progress demands clear metrics and systematic tracking. Creating measurement infrastructure before you begin experiments might seem tedious, but it's the difference between wandering and journeying with purpose.

You can't improve what you can't measure. Start with an empty results table that will track all your experiments:
- Keep this visible to your entire team
- Each row represents an experiment or idea
- Document your thoughts before and after seeing results

Here's a concrete example: Open a new [Google Sheet](https://workspace.google.com/products/sheets/) and title it with your project name (e.g., "Image Classification Performance Tracking"). Create a table like this:

| Exp ID | Hypothesis | Metric 1 | Metric 2 | Metric 3 | Observations |
|--------|------------|----------|----------|----------|--------------|
| exp001 |            |          |          |          |              |
| exp002 |            |          |          |          |              |
| exp003 |            |          |          |          |              |

Share this sheet with your entire team and make it a habit to update it immediately after each experiment. This practice becomes invaluable when you're discussing results weeks later or onboarding new team members.

I've seen many early career researchers struggle to maintain momentum because they didn't establish consistent measurement practices from the beginning. Without a structured way to track experiments, they lose valuable insights, repeat unsuccessful approaches, and can't effectively communicate progress to collaborators or supervisors. When you document both your expectations and reality, patterns emerge that guide your intuition. That "failed" experiment revealing an unexpected interaction between variables? It's recorded rather than forgotten, potentially saving weeks of work later when a similar pattern emerges.

This simple practice creates accountability and helps you spot patterns in what works and what doesn't. It also prevents the all-too-common scenario of forgetting which configuration produced that promising result two weeks ago.

**Deliverable**: A results tracking table that will evolve throughout your project.

## Step 4: Start Coding!

The difference between a weekend hobby project and professional research often comes down to infrastructure. While it's tempting to jump straight to the exciting algorithmic work, spending an hour on proper setup will save days of frustration later.

Good infrastructure saves time later:
- Initialize a Git repository from a template (I recommend [cookiecutter-ml](https://github.com/Akramz/cookiecutter-ml) for machine learning projects)
- Pick a meaningful project name
- Create a mamba or uv environment
- Install initial data science packages and your project package

For any research direction (comprised of multiple experiments), create a new Git branch. Commit every time you complete a unit of work. This discipline makes it easier to track progress and roll back if needed.

I learned this lesson the hard way after losing work to environment conflicts. Now, proper setup is my non-negotiable first step. Clean infrastructure doesn't just prevent disasters—it frees your mental bandwidth to focus on the science rather than hunting down missing dependencies or reconciling conflicting versions.

## Step 5: Run Your First Experiment

The first experiment is a milestone—it transforms your project from theoretical to empirical. But resist the urge to implement that cutting-edge approach immediately. Starting simple gives you valuable context and often reveals insights that sophisticated models might obscure.

### Baselines

Always start with simple baselines:
- For regression: mean/median/mode predictions
- For classification: most common class or random guessing
- For temporal data: persistence models, moving averages, etc.
- For spatial data: nearest neighbor approaches

These baselines establish the minimum performance bar you need to beat.

You might discover that your fancy ensemble model is barely outperforming a weighted average of three variables. This revelation can completely redirect research focus toward data mining rather than model architecture. Starting simple doesn't just establish a performance floor—it often reveals the true nature of your problem.

### Implementation

For your ML experiments:
1. Prototype in [Jupyter notebooks](https://jupyter.org/) first
2. Be intentional about parameters:
   - Scientific parameters: what you're actually testing
   - Nuisance parameters: settings that need to be tuned separately for each experiment to ensure peak performance, but aren't the focus of your research question (e.g., learning rate in deep learning, regularization strength, optimization algorithm)
   - Fixed parameters: consistent across experiments
3. Train, test, and evaluate rigorously

After each experiment:
- Export results to your tracking table
- Move working code from notebooks to your codebase

### Error Analysis

Error analysis is perhaps the most underrated skill in applied ML research. It's the systematic examination of where your model fails, and it's the compass that guides your next experiments.

After implementing your model:
- Identify and categorize the top 10-20% of errors by magnitude
- Look for patterns in these errors (similar input features, edge cases, etc.)
- Create hypotheses about why these errors occur
- Brainstorm targeted improvements to address each error category

The power of systematic error analysis lies in its efficiency. Rather than randomly trying new architectures or features, you focus precisely on eliminating large groups of similar errors. Each iteration becomes purposeful, addressing specific failure modes instead of making blind modifications. This targeted approach often leads to rapid improvement curves, as you systematically eliminate one error category after another.

When researchers struggle to make progress, it's frequently because they're not analyzing their errors in sufficient detail. The next breakthrough is usually hiding in the patterns of your model's mistakes.

## Step 6: Accelerate Your Research

The most valuable resource in research isn't computing power or data—it's time. The teams that succeed are those that iterate quickly, testing more hypotheses in less time. This isn't about cutting corners; it's about accelerate feedback cycles at a lower time & compute cost. You have limited time and compute—use them wisely:

**Subsample strategically:**
- Test ideas on smaller data subsets first
- Use a small test set for initial validation
- Evaluate early checkpoints during training

**Maximize GPU usage:**
- Increase batch size to your hardware's limits
- Optimize data loading to minimize wait time between batches

**Visualize frequently:**
- Check model outputs during the first few epochs
- Monitor at significant checkpoints to catch issues early

**Run parallel experiments, not parallel training:**
- Use GPUs for multiple experiments rather than one distributed one
- Distribute evaluation tasks across machines or cores

For a comprehensive guide to systematic model tuning and experiment design, I recommend Google Research's [ML Tuning Playbook](https://github.com/google-research/tuning_playbook), which outlines proven strategies for efficient hyperparameter optimization.

These acceleration techniques can transform research productivity. Teams that implement them often go from running one experiment per day to testing five different approaches simultaneously. The psychological benefit is just as important as the technical one—quick feedback loops maintain momentum and enthusiasm. By catching unproductive approaches early, you avoid the motivation-killing experience of investing weeks in dead ends.

## Step 7: Manage Complexity

Research code has a natural tendency to grow chaotic as you explore different approaches. Left unchecked, this complexity becomes a tax on every subsequent experiment—slowing you down just when you should be accelerating. Maintaining clean code isn't just about aesthetics; it's about preserving your ability to move quickly.

Keep your codebase tidy:
- Export non-exploratory code from notebooks to your package
- Modularize and "black-box" your code
- Use automatic formatters like Black
- Delete dead code (Git will preserve it in history)

Fight code "spaghetti" by watching for warning signs:
- Weird variable/function names
- Duplicated code blocks
- Overly large functions
- Deeply nested conditionals and loops
- Hardcoded values (numbers, paths, etc.)

Document as you go:
- Write a comprehensive `README.md`
- Add comments to explain non-obvious code choices
- Use assertions and exceptions to catch errors early

For more comprehensive guidance on research code best practices, I highly recommend [The Good Research Code Handbook](https://goodresearch.dev/), which provides excellent strategies for maintaining high-quality, reproducible research code.

Many researchers have experienced both sides of this coin. When teams neglect code quality in the rush to produce results, technical debt accumulates until even simple changes require hours of untangling dependencies. When they finally dedicate time to refactoring, subsequent progress often accelerates dramatically. Disciplined complexity management isn't a distraction from research—it's the foundation that makes sustained progress possible.

## Step 8: Write Your Paper Draft

Writing isn't separate from research—it's an integral part of the scientific process. Articulating your work clarifies your thinking and often reveals insights you missed while deep in the technical weeds. Starting the paper before you feel "ready" forces valuable reflection that can redirect your final experiments.

Assemble your previous deliverables:
- Title & Abstract
- Related Work
- Results Table

Then write:
- Methods
- Results
- Conclusion
- Introduction (yes, often best written last)

Follow these guidelines for clear scientific writing:
- Use active voice and direct language
- Explain your paper's objective in a single sentence in the abstract
- Describe experiments in one paragraph in the introduction
- Create clear diagrams with good captions and labeled axes
- Minimize abbreviations
- Cite strong papers with contrary claims
- Write in natural, simple language
- Explain your reasoning when interpreting results
- Structure your argument logically:
  1. Here's a problem
  2. It's an interesting problem
  3. It's unsolved
  4. Here's my idea
  5. My idea works (with evidence)
  6. Here's how my approach compares to others
  7. Here's how we can evolve this idea

**Helpful tools:**
- Use [Overleaf](https://www.overleaf.com) for collaborative LaTeX writing
- Generate professional tables with [Tables Generator](https://www.tablesgenerator.com/)
- Clean your LaTeX files for arXiv submission with [arXiv Cleaner](https://github.com/djsutherland/arxiv-collector/)

Writing early drafts has repeatedly improved research trajectories for countless scientists. While documenting methods, researchers often realize they've overlooked critical steps or assumptions. These discoveries not only improve model performance but strengthen papers by addressing potential criticisms before reviewers can raise them. The act of writing doesn't just communicate research—it improves it.

## Step 9: Iterate

The romantic notion of research as a linear path to discovery rarely matches reality. Nothing is linear in research. The most impactful work often emerges from cycles of trial, reflection, and refinement. Embracing this iterative nature turns apparent setbacks into stepping stones toward deeper understanding.

Discuss your results honestly. Did you achieve your goal?
- If yes, submit the paper or implement the solution
- If no, design another experiment and return to the cycle

In practice, true breakthroughs rarely come from the first round of experiments. The most influential papers in our field often underwent several complete reimaginings of their central approach before finding the right framing. Each "failure" narrows the solution space until researchers discover elegant approaches they would never have considered initially. Research is inherently iterative. Each cycle brings you closer to a meaningful contribution, even if not in the way initially expected.

## Summary

This approach has helped many researchers conduct more effective applied ML research with less wasted effort. The key is maintaining momentum through rapid, thoughtful experimentation while keeping the big picture in view. By following these steps, you'll avoid common pitfalls, accelerate your progress, and increase your chances of making a meaningful contribution to the field.

Remember that behind every elegant research paper lies a messy, iterative process of discovery. The difference between successful and struggling researchers often isn't brilliance—it's having a structured approach that turns the inevitable challenges into opportunities for insight. I hope these guidelines help you in your own ML research journey.