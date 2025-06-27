import React from 'react';
import '../../styles/BlogPage.css';
import salmon from '../../assets/salmon.png';

const EmpatheticSalmon = () => {
  return (
    <div className="blog-container">
      <h1>Empathetic Salmon</h1>
      <p className="subtitle">Improbable things happen more often than you'd think.</p>
      <div className="blog-content">
        <p>
          Imagine I told you a dead salmon can correctly assess the emotions of humans. You would probably be pretty skeptical or wave me off thinking I had gone a bit crazy. I would counter with concrete evidence of fMRI images of a salmon's brain in which each scan, broken down into voxels (an fMRI method that breaks each scan down into thousands of pieces), corresponds to small sections of the salmon brain. Two groups of these voxels, one in the spinal column and the other in the medial brain cavity, were highly successful at recognizing human facial expressions.
        </p>
        <img src={salmon} alt="Salmon" className="blog-image"/>
        <p>
          Woah! Imagine how empathetic a living salmon would be! This was an actual study presented at the 2009 Organization for Human Brain Mapping Conference (it won an Ig Nobel prize).
        </p>
        <p>
          The reality is that there is a random amount of noise per voxel. Noise is a random, non-biological signal detected during neuroimaging. Given that a salmon nervous system contains thousands of voxels, the odds of a voxel randomly spiking is high. What are the chances the noise spiked when a salmon was shown an image of a person crying? High enough to occur consecutive times in two regions of the salmon brain! The beauty of this study is the fact that improbable things happen all the time and that there are flaws in scientific research.
        </p>
        <p>
          Applying this to what we see everyday, it is not hard to find a self-help social media post claiming a new solution to weight loss is blah blah blah. Claiming that eliminating all carbohydrates in your diet is good for you and has helped numerous people with weight loss. Similar to the spikes in salmon brain voxels, thousands of those viewers bought into this idea and tried this remedy. The odds are, by chance alone, someone lost weight. Those few people return to the post and spread news of their success and get the most attention.
        </p>
        <p>
          Let's put this in an equation that represents the argument about the odds of weight loss given solution x. But first we need to make a few assumptions:
          <ol>
            <li>Each person's outcome (whether they lose weight or not) is independent of each other</li>
            <li>The probability (p) of a person losing weight due to the solution (x) or by random chance is the same per person</li>
            <li>The outcome for each person is binary: they either lose weight (success) or they do not (failure)</li>
            <li>There is a sufficiently large number of people n trying the solution</li>
          </ol>
        </p>
        <p>
          Let's introduce our variables:
          <ul>
            <li>n - total number of people trying the weight loss solution</li>
            <li>p - probability of weight loss due to the solution or random chance</li>
            <li>k - number of people who report successful weight loss</li>
          </ul>
        </p>
        <p>
          To begin, you want to calculate the probability of a certain number of people k losing weight out of a total number n trying a weight loss solution.
          Each person either succeeds (loses weight) or fails (doesn't lose weight), making it a binary outcome. The probability of success for each person is p, and the probability of failure is 1-p.
        </p>
        <p>
          Imagine 5 people trying this diet. Similar to the voxel spikes, we might find that 3/5 people report weight loss success; those 3 could be any combination of the 5. We would need to calculate all possible ways k successes can happen out of n tries using a binomial coefficient, C(n, k). This will output all the k successes that could occur from our total n people.
        </p>
        <p>
          What is the probability of seeing exactly k successes out of n people trying the diet. Per successful person(k), we multiply by the chance of success(p), and for each unsuccessful person, we multiply by 1-p (the chance of failure).
        </p>
        <p>
          Combining our variables we get:
          <br />
          <strong>P(X = k) = C(n, k) × p<sup>k</sup> × (1-p)<sup>n-k</sup></strong>
        </p>
        <p>
          Applying this equation to our weight loss example,
          <ul>
            <li>n = 5 (total friends)</li>
            <li>k = 3 (successful friends)</li>
            <li>p = 0.09 (9% chance of random success cited from https://pmc.ncbi.nlm.nih.gov/articles/PMC4539812/)</li>
          </ul>
        </p>
        <p>
          Breakdown the equation into three pieces:
          <ul>
            <li>Binomial{5}{3} = 10 (there are 10 different ways to pick 3 friends from a group of 5)</li>
            <li>(0.09)³ = 0.000729 (probability of 3 successes)</li>
            <li>(1-0.09)⁵⁻³ = (0.91)² = 0.8281 (probability of 2 failures)</li>
          </ul>
        </p>
        <p>
          Multiply it all together: 10 × 0.008 × 0.64 = 0.0512
        </p>
        <p>
          There's about a 5.1% chance of seeing exactly 3 successful weight loss stories out of 5 people, just by random chance! That's a lot more likely than you might think - kind of like finding an empathetic salmon!
        </p>
      </div>
    </div>
  );
};

export default EmpatheticSalmon;
