###### Project 02
###### Charly Yan Miller

##### design overview
In which random (random from a pre-determined array of id's) containing youtube videos
fall from the sky and the user can swipe left or right to respectively close or open the video.

##### technical.... 
In terms of programmatic skill demonstrated the physics system (including collision resolutions)
were written by me.

This was also my first attempt at creating a sort of game "engine" with the
entity component system paradigm in mind, in short instead incapuslating logic AND data
into massive objects you instantiate entities which you attach components.
These components have no methods (simply member vars) and then systems work and manipulate
these components. This seperation between data and things which act on data is useful
in part because it reduces the artificial duplication of data which object oriented
apporahces tend to encourage and the more reliable relationship between and placement
of systems and data in theory helps scalability. This being said, ECS is also usually a performance oriented architecture which tries to decrease cache misses, JS is too high-level to reasonably worry about cache misses, and I didn't really understand cache friendliness at the time of writing this "engine" anyways.

References (no code copied from these sources):
Programming Balls #1 Circle vs Circle Collisions c++
https://www.youtube.com/watch?v=LPzyNOHY3A4
(got me thinking to how I could use dot product to create a reasonable collision response)
Overwatch Gameplay Architecture and Netcode
https://www.youtube.com/watch?v=W3aieHjyNvw&t=1075s
(got me interested/aware of ECS game engine paradigm in the first place)
Entity Component System #1,2,3
https://www.youtube.com/watch?v=5KugyHKsXLQ&t=10s
More concrete a slower explanation and rational for Entity component systems
