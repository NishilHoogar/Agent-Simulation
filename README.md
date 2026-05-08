Reinforcement Learning Grid Simulation

A simple reinforcement learning simulation built using HTML, JavaScript, and Canvas.
The project demonstrates how an agent can learn to reach a goal using the Q-Learning algorithm.

This small project recreates the core concepts behind reinforcement learning systems used in modern AI research, including work done at Google DeepMind.

Project Overview

The simulation contains:

A 5×5 grid environment

An agent (blue square)

A goal/food (green square)

The agent starts at the top-left corner and must learn how to reach the food placed in the bottom-right corner.

Initially the agent moves randomly. Over time, it learns the optimal path by updating its knowledge based on rewards.

Concepts Demonstrated

This project introduces several core Reinforcement Learning (RL) concepts.

Environment

The grid world where the agent moves.

Agent

The entity trying to reach the goal.

State

The current position of the agent.

Example state:

"0,0"
Actions

The agent can take four actions:

up
down
left
right
Reward System

The agent receives:

+10  when it reaches the food
-1   for every step taken

This encourages the agent to find the shortest path.

Learning Algorithm

The agent learns using Q-Learning, a fundamental reinforcement learning algorithm.

The update rule used is:

Q(s,a) \leftarrow Q(s,a) + \alpha [ r + \gamma \max_a Q(s',a) - Q(s,a) ]

Where:

s = current state

a = action taken

r = reward received

s' = next state

α (alpha) = learning rate

γ (gamma) = discount factor

This formula gradually improves the agent’s decision-making.

Q-Table

The agent stores its knowledge in a Q-table, which maps:

state → action values

Example:

"0,0": {
  up: -0.8,
  down: 1.4,
  left: -0.9,
  right: 2.1
}

This means that from (0,0) the agent believes moving right is the best choice.

How the Learning Works

Agent observes its current state

It chooses an action using exploration vs exploitation

The environment returns a reward

The Q-table is updated

The process repeats

After many iterations the agent learns the optimal route to the goal.

Technologies Used

HTML

JavaScript

HTML5 Canvas

Reinforcement Learning (Q-Learning)

How to Run the Project

Clone or download the project.

git clone <repo-url>

Open the project folder.

Open index.html in a browser.

Watch the agent learn in real time.

Observing the Learning

Open the browser console and type:

Q

You will see the Q-table, which represents the agent’s learned knowledge of the environment.

Future Improvements

Possible extensions include:

Adding obstacles

Visualizing the policy direction

Displaying a reward heatmap

Multiple agents

Larger environments

Educational Purpose

This project is designed to demonstrate the core mechanics of reinforcement learning in the simplest possible way.

It serves as a starting point for understanding more advanced AI systems and simulations.