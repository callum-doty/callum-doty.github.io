import React, { useState } from 'react';
import '../styles/Blog.css'; 
import salmon from "../assets/salmon.png"

const blogPosts = [
  { 
    id: 1, 
    title: "DUI", 
    content: "Drinking, Driving, and Bayesian Analysis",
    fullContent: `You've just hit a milestone - you're 16 and finally have your driver's license in hand. The freedom and independence you feel are exhilarating. Eager to enjoy your newfound autonomy, you hop into your car for an evening drive. But as luck would have it, your adventure takes an unexpected turn when a police officer flags you down for a routine traffic stop.

The officer's demeanor is stern, and you sense their suspicion as they request to conduct a few tests. Despite feeling nervous, you comply, and take a breathalyzer test to determine if you're under the influence of alcohol. You test positive and are promptly arrested.

Keep in mind: 

1. The breathalyzer indicates false drunkenness in only 5% of cases when the driver is sober
2. The breathalyzers never fail to detect a truly drunk person
3. One in a thousand drivers in your region drive drunk 

Fast forward to the trial, and the situation feels dire. Despite your protests of innocence, the breathalyzer test results are presented as evidence against you. The prosecutor paints a grim picture, arguing that there's a mere 5% chance of your innocence, citing the breathalyzer's supposed accuracy rate of 95%.

With the evidence resting heavily on your shoulders, you're faced with the daunting task of proving your innocence beyond a reasonable doubt. The stakes are high, and the thought of a DUI conviction looming over you feels suffocating. It's a moment where you can't help but feel like your life is hanging in the balance.

What if I told you that based on the positive breathalyzer test, the probability that you were driving drunk is less than 2%....

Hopefully, I caught your attention. To explain this, I will introduce a few key concepts. First, Bayes theorem, named after the Reverend Thomas Bayes, is a fundamental concept in probability theory and statistics. It describes the probability of an event, based on prior knowledge of conditions that might be related to the event.

There are many variations but for this context it is expressed as: 

P(A | B) = P(B | A)×P(A) / P(B) 

If we were to describe the formula above, it would translate to: 

P(A | B) is the conditional probability of event A occurring given that event B has occurred.
P(B | A) is the conditional probability of event B occurring given that event A has occurred.
P(A) and P(B) are the probabilities of events A and B occurring independently of each other.

Let's apply Bayes Theorem to your situation. Let:

D = You are drunk
S = You are sober
tD = The test indicates you are drunk

The new equation would look like this: P(D | tD) = P(tD | D)×P(D)  /  P(tD) 

This may look a bit intimidating, lets translate this into natural language: 

Pr (D) is the prior probability of D
Pr (D | tD) is the posterior probability of D
Pr (tD | D) is the likelihood of D
Pr (tD) is the unconditional probability of the positive breathalyzer result

So, the probability of you driving drunk given a positive test is equal to the probability of a positive test correctly diagnosing you as being drunk multiplied by the probability of you being drunk divided by the unconditional probability of a positive breathalyzer.

We have all but one piece of information to solve the equation. We need to find Pr (tD). To calculate Pr(tD), you need to consider all possible scenarios where a positive test result could occur, regardless of whether the person is intoxicated or not.

Lets use: Pr (tD) = Pr (tD | D) x Pr (D) + Pr (tD | S) x Pr (S)

Translated to natural language: The probability of you driving drunk given a positive test multiplied by the probability of you being drunk added to the probability of a false positive from a test multiplied by the probability of you being sober. 

We can find Pr(tD) using the information I said to keep in mind, remember that only one in a thousand drivers in your region drives drunk, so Pr (D) = .001 and Pr (S) = .999. Also recall that the breathalyzer indicates false drunkenness in only 5% of cases when the driver is sober, and never fails to detect a drunk person. We can assign Pr (tD | D) = 1 and Pr (tD | S) = .05. So:

Pr (D) = .001
Pr (S) = .999
Pr (tD | D) = 1
Pr (tD | S) = .05

Sweet! So now we plug in our number to find Pr(tD): Pr (tD | D) x Pr (D) + Pr (tD | S) x Pr (S)

(1 x .001) + (.05 x .999) = 0.05095
Pr(tD) = 0.05095

Lets plug in the new value for Pr(tD) into the original problem.

Pr (D | tD) = Pr (tD | D) x Pr (D) / Pr (tD)
(1 x .001) / .05095 = 0.01962709
                        
Convert this to a percentage, the probability that you were driving drunk, based on the positive breathalyzer test alone, is 1.96%

Life changing right?

When we think about the quality of a test, what we want to know, what we're testing for, and how we make sense of the results to make decisions, it is easy to make mistakes. In the case of this situation, the evidence of a 95% accurate breathalyzer appears convincing, but the line is not clearly cut.`
  },
  { 
    id: 2, 
    title: "Silver Rule", 
    content: "Limitations of the Golden Rule: 'Treat others the way you want to be treated.'",
    fullContent: `Growing up, we were inundated with rules and maxims meant to guide our behavior and instill a sense of empathy. One such rule, echoed throughout our elementary school, was the Golden Rule: "Treat others the way you want to be treated." It was a mantra drilled into us, intended to foster kindness and consideration towards others.

But if I'm being honest, this rule always left me a bit perplexed. Deep down, I couldn't shake the feeling that not everyone wished to be treated in the same manner they treated themselves. There seemed to be a disconnect between the Golden Rule and human nature.

Fifteen years later, I can finally respond to this argument. Let define the Golden Rule!

The golden rule is defined as an act is right if and only if, in performing it, we treat others as we would like to be treated. The notions of necessary and sufficient conditions are defined:

1. If we are acting rightly, then we're treating others as we would like to be treated.
2. If we're treating others as we would like to be treated, then we're acting rightly.

Hmmm, it appears a loop is forming. Condition (1) supports the conclusion, Condition (2). Condition (2) assumes that we are acting rightly if we are treating others the way we would like to be treated. Wait a second, the conclusion just restated Condition (1)! 

Alas, the conditions of the golden rule assume each other rather than using sound reasoning and evidence. It's called circular reasoning and is a logical fallacy (a fancy word for an invalid argument). Surprise! You have been guided by flawed logic your entire childhood!

Let's dive deeper! 

The Conditions (1) and (2) attempt to define moral rightness with fairness. If you think it is right to treat someone in a specific fashion, then you should accept that same treatment from the receiver. In addition, you would always be acting wrongly if you were to treat someone differently than how you would treat yourself.

It really makes you think that the masochists in elementary school had the upper hand huh? 

Suppose we create our own version of the Golden Rule, what would that look like? We could begin by creating an equation for the original golden rule: 
x = y

To be as concise and inclusive as possible, let's focus on individual factors (specific action considered), contextual factors (context in which the action occurs), impact on others (consequences of the action on others), and values (individual's personal values). This will be our framework for a new formula that measures ethical behavior rather than rightness. To quantify the components of our framework lets assign the following:

Let individual factors = ∑i=1n βi * fi*
Let contextual factors = γ ⋅ C
Let impact on other = δ ⋅ D
Let values = ϵ ⋅ V

To clarify the equation, we can contribute any number of individual factors to our equation and add the weighted contextual factors, weighted impact on others, and weighted values. The weights are defined as: 

𝛽1, 𝛽2… 𝛽n, 𝛾, 𝛿, 𝜖

Looping back to the original golden rule (x=y), we can define the new and improved formula to be:

X = ∑*i*=1n  β1 ⋅ f1 + βn ⋅ fn + γ ⋅ C + δ ⋅ D + ϵ ⋅ V

When we find 'X' for a given action, we can determine whether the action output (X) is a higher (ethical) or lower number (unethical). 

This raises a few questions:
1. How to determining the weights (β, γ, δ, ϵ)? These could vary significantly based on cultural and personal values.
2. The framework allows for objective comparison between actions, but we need a boundary conditions or normalization to make the scale more interpretable.
3. A temporal component to account for both short-term and long-term consequences of actions?`
  },
  { 
    id: 3, 
    title: "Empathetic Salmon", 
    content: "Improbable things happen more often than you'd think.",
    img: salmon,
    fullContent: `Imagine I told you a dead salmon can correctly assess the emotions of humans. You would probably be pretty skeptical or wave me off thinking I had gone a bit crazy. I would counter with concrete evidence of fMRI images of a salmon's brain in which each scan, broken down into voxels (an fMRI method that breaks each scan down into thousands of pieces), corresponds to small sections of the salmon brain. Two groups of these voxels, one in the spinal column and the other in the medial brain cavity, were highly successful at recognizing human facial expressions.' 


'${salmon}'

'Woah! Imagine how empathetic a living salmon would be! This was an actual study presented at the 2009 Organization for Human Brain Mapping Conference (it won an Ig Nobel prize).

The reality is that there is a random amount of noise per voxel. Noise is a random, non-biological signal detected during neuroimaging. Given that a salmon nervous system contains thousands of voxels, the odds of a voxel randomly spiking is high. What are the chances the noise spiked when a salmon was shown an image of a person crying? High enough to occur consecutive times in two regions of the salmon brain! The beauty of this study is the fact that improbable things happen all the time and that there are flaws in scientific research.

Applying this to what we see everyday, it is not hard to find a self-help social media post claiming a new solution to weight loss is blah blah blah. Claiming that eliminating all carbohydrates in your diet is good for you and has helped numerous people with weight loss. Similar to the spikes in salmon brain voxels, thousands of those viewers bought into this idea and tried this remedy. The odds are, by chance alone, someone lost weight. Those few people return to the post and spread news of their success and get the most attention.

Let's put this in an equation that represents the argument about the odds of weight loss given solution x. But first we need to make a few assumptions:

1. Each person's outcome (whether they lose weight or not) is independent of each other
2. The probability (p) of a person losing weight due to the solution (x) or by random chance is the same per person
3. The outcome for each person is binary: they either lose weight (success) or they do not (failure)
4. There is a sufficiently large number of people n trying the solution

Let's introduce our variables:

n - total number of people trying the weight loss solution
p - probability of weight loss due to the solution or random chance
k - number of people who report successful weight loss

To begin, you want to calculate the probability of a certain number of people k losing weight out of a total number n trying a weight loss solution.
Each person either succeeds (loses weight) or fails (doesn't lose weight), making it a binary outcome. The probability of success for each person is p, and the probability of failure is 1-p.

Imagine 5 people trying this diet. Similar to the voxel spikes, we might find that 3/5 people report weight loss success; those 3 could be any combination of the 5. We would need to calculate all possible ways k successes can happen out of n tries using a binomial coefficient (binomial{n}{k}). This will output all the k successes that could occur from our total n people.

What is the probability of seeing exactly k successes out of n people trying the diet. Per successful person(k), we multiply by the chance of success(p), and for each unsuccessful person, we multiply by 1-p (the chance of failure).

Combining our variables we get:

P(X = k) = binomial{n}{k} × p^k × (1-p)^(n-k)

Applying this equation to our weight loss example,

n = 5 (total friends)
k = 3 (successful friends)
p = 0.09 (9% chance of random success cited from https://pmc.ncbi.nlm.nih.gov/articles/PMC4539812/)

Breakdown the equation into three pieces:

Binomial{5}{3} = 10 (there are 10 different ways to pick 3 friends from a group of 5)
(0.09)³ = 0.000729 (probability of 3 successes)
(1-0.09)⁵⁻³ = (0.91)² = 0.8281 (probability of 2 failures)

Multiply it all together: 10 × 0.008 × 0.64 = 0.0512

There's about a 5.1% chance of seeing exactly 3 successful weight loss stories out of 5 people, just by random chance! That's a lot more likely than you might think - kind of like finding an empathetic salmon!`
  },
];

const BlogPostList = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };

  const renderContent = (paragraph) => {
    // Check if the paragraph is an image path (starts and ends with quotes and contains .png, .jpg, etc.)
    if (paragraph.trim().startsWith("'") && paragraph.trim().endsWith("'") && 
        paragraph.includes('.png')) {
      const imagePath = paragraph.trim().replace(/'/g, '');
      return (
        <img 
          src={imagePath} 
          alt="Blog post illustration" 
          className="blog-image"
          style={{
            width: '100%',
            maxWidth: '600px',
            height: 'auto',
            margin: '2rem auto',
            display: 'block',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        />
      );
    }
    // Otherwise render as normal paragraph
    return <p style={{ whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>{paragraph}</p>;
  };

  return (
    <div className="container">
      <h1>Topics of Interest</h1>
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <div 
            key={post.id} 
            className="blog-card"
            onClick={() => openModal(post)}
            role="button"
            tabIndex={0}
          >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="close-button"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <h2>{selectedPost.title}</h2>
            <div className="blog-content">
              {selectedPost.fullContent.split('\n\n').map((paragraph, index) => (
                <div key={index}>
                  {renderContent(paragraph)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostList;