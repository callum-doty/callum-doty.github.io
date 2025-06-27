import React from 'react';
import '../../styles/BlogPage.css';

const DUI = () => {
  return (
    <div className="blog-container">
      <h1>DUI</h1>
      <p className="subtitle">Drinking, Driving, and Bayesian Analysis</p>
      <div className="blog-content">
        <p>
          You've just hit a milestone - you're 16 and finally have your driver's license in hand. The freedom and independence you feel are exhilarating. Eager to enjoy your newfound autonomy, you hop into your car for an evening drive. But as luck would have it, your adventure takes an unexpected turn when a police officer flags you down for a routine traffic stop.
        </p>
        <p>
          The officer's demeanor is stern, and you sense their suspicion as they request to conduct a few tests. Despite feeling nervous, you comply, and take a breathalyzer test to determine if you're under the influence of alcohol. You test positive and are promptly arrested.
        </p>
        <p>
          Keep in mind:
          <ol>
            <li>The breathalyzer indicates false drunkenness in only 5% of cases when the driver is sober</li>
            <li>The breathalyzers never fail to detect a truly drunk person</li>
            <li>One in a thousand drivers in your region drive drunk</li>
          </ol>
        </p>
        <p>
          Fast forward to the trial, and the situation feels dire. Despite your protests of innocence, the breathalyzer test results are presented as evidence against you. The prosecutor paints a grim picture, arguing that there's a mere 5% chance of your innocence, citing the breathalyzer's supposed accuracy rate of 95%.
        </p>
        <p>
          With the evidence resting heavily on your shoulders, you're faced with the daunting task of proving your innocence beyond a reasonable doubt. The stakes are high, and the thought of a DUI conviction looming over you feels suffocating. It's a moment where you can't help but feel like your life is hanging in the balance.
        </p>
        <p>
          What if I told you that based on the positive breathalyzer test, the probability that you were driving drunk is less than 2%....
        </p>
        <p>
          Hopefully, I caught your attention. To explain this, I will introduce a few key concepts. First, Bayes theorem, named after the Reverend Thomas Bayes, is a fundamental concept in probability theory and statistics. It describes the probability of an event, based on prior knowledge of conditions that might be related to the event.
        </p>
        <p>
          There are many variations but for this context it is expressed as:
          <br />
          <strong>P(A | B) = P(B | A)×P(A) / P(B)</strong>
        </p>
        <p>
          If we were to describe the formula above, it would translate to:
          <ul>
            <li>P(A | B) is the conditional probability of event A occurring given that event B has occurred.</li>
            <li>P(B | A) is the conditional probability of event B occurring given that event A has occurred.</li>
            <li>P(A) and P(B) are the probabilities of events A and B occurring independently of each other.</li>
          </ul>
        </p>
        <p>
          Let's apply Bayes Theorem to your situation. Let:
          <ul>
            <li>D = You are drunk</li>
            <li>S = You are sober</li>
            <li>tD = The test indicates you are drunk</li>
          </ul>
        </p>
        <p>
          The new equation would look like this: <strong>P(D | tD) = P(tD | D)×P(D)  /  P(tD)</strong>
        </p>
        <p>
          This may look a bit intimidating, lets translate this into natural language:
          <ul>
            <li>Pr (D) is the prior probability of D</li>
            <li>Pr (D | tD) is the posterior probability of D</li>
            <li>Pr (tD | D) is the likelihood of D</li>
            <li>Pr (tD) is the unconditional probability of the positive breathalyzer result</li>
          </ul>
        </p>
        <p>
          So, the probability of you driving drunk given a positive test is equal to the probability of a positive test correctly diagnosing you as being drunk multiplied by the probability of you being drunk divided by the unconditional probability of a positive breathalyzer.
        </p>
        <p>
          We have all but one piece of information to solve the equation. We need to find Pr (tD). To calculate Pr(tD), you need to consider all possible scenarios where a positive test result could occur, regardless of whether the person is intoxicated or not.
        </p>
        <p>
          Lets use: <strong>Pr (tD) = Pr (tD | D) x Pr (D) + Pr (tD | S) x Pr (S)</strong>
        </p>
        <p>
          Translated to natural language: The probability of you driving drunk given a positive test multiplied by the probability of you being drunk added to the probability of a false positive from a test multiplied by the probability of you being sober.
        </p>
        <p>
          We can find Pr(tD) using the information I said to keep in mind, remember that only one in a thousand drivers in your region drives drunk, so Pr (D) = .001 and Pr (S) = .999. Also recall that the breathalyzer indicates false drunkenness in only 5% of cases when the driver is sober, and never fails to detect a drunk person. We can assign Pr (tD | D) = 1 and Pr (tD | S) = .05. So:
          <ul>
            <li>Pr (D) = .001</li>
            <li>Pr (S) = .999</li>
            <li>Pr (tD | D) = 1</li>
            <li>Pr (tD | S) = .05</li>
          </ul>
        </p>
        <p>
          Sweet! So now we plug in our number to find Pr(tD): Pr (tD | D) x Pr (D) + Pr (tD | S) x Pr (S)
          <br />
          (1 x .001) + (.05 x .999) = 0.05095
          <br />
          Pr(tD) = 0.05095
        </p>
        <p>
          Lets plug in the new value for Pr(tD) into the original problem.
          <br />
          Pr (D | tD) = Pr (tD | D) x Pr (D) / Pr (tD)
          <br />
          (1 x .001) / .05095 = 0.01962709
        </p>
        <p>
          Convert this to a percentage, the probability that you were driving drunk, based on the positive breathalyzer test alone, is 1.96%
        </p>
        <p>
          Life changing right?
        </p>
        <p>
          When we think about the quality of a test, what we want to know, what we're testing for, and how we make sense of the results to make decisions, it is easy to make mistakes. In the case of this situation, the evidence of a 95% accurate breathalyzer appears convincing, but the line is not clearly cut.
        </p>
      </div>
    </div>
  );
};

export default DUI;
