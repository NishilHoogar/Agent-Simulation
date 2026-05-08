import random

grid_size = 4
food = (2,2)

actions = ["up","down","left","right"]

Q = {}

alpha = 0.1
gamma = 0.9
epsilon = 0.2

def get_state(x,y):
    return (x,y)

def choose_action(state):

    if random.random() < epsilon:
        return random.randint(0,3)

    if state not in Q:
        Q[state] = [0,0,0,0]

    return Q[state].index(max(Q[state]))

def move(x,y,action):

    if action == 0:
        y = max(0,y-1)

    if action == 1:
        y = min(grid_size-1,y+1)

    if action == 2:
        x = max(0,x-1)

    if action == 3:
        x = min(grid_size-1,x+1)

    return x,y

for episode in range(2000):

    x,y = 0,0

    while (x,y) != food:

        state = get_state(x,y)

        if state not in Q:
            Q[state] = [0,0,0,0]

        action = choose_action(state)

        new_x,new_y = move(x,y,action)

        reward = -1
        if (new_x,new_y) == food:
            reward = 10

        next_state = (new_x,new_y)

        if next_state not in Q:
            Q[next_state] = [0,0,0,0]

        best_next = max(Q[next_state])

        Q[state][action] += alpha*(reward + gamma*best_next - Q[state][action])

        x,y = new_x,new_y

print("Training finished")
print(Q)