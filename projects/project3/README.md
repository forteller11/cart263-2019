CART 263-2019
Project 3: Ludic Sphere
Charly Yan Miller
---------------------------
Instructions:
------------
  MOVEMENT:
    w - forwards
    a - left
    s - backwards
    d - right
    lShift - down
    spacebar - up

  ROTATION:
    click and drag
------------

--------------------------

I wanted to reattempt the sort of non-narrative walking simulator (/tech demo?) that I created in the first semester but this time in all three dimensions. Similar to the way in which sound generation drove the height of the walls in last semester’s final this time I was planning on driving the position of vertices with data from APIs which would accordingly morph various data generated shapes. Hopefully this would give the whole project some (admittedly contrived) conceptual substance as often data visualizations provide interesting and often politically charged interpretations of our contemporary increasingly data-oriented world.

At the start of the project I dabbled with webGL but it required writing code in a lower level C like language (openGL) which meant I was forced to more or less mindlessly follow tutorials. I decided to instead create a 3D visualization using just the html canvas which I was much more comfortable in and did not require the learning of an entirely new language.

As I got further into the project and spent a significant portion of time on creating a function which parsed human modelled .obj files I had a harder and harder time thinking of a way to create meshes which were both data driven, visually distinct, while maintaining spatial readability (as the lack of lighting, texturing and frame perfect z-buffering of any sort made complex or extreme meshes difficult to correctly interpret).

At the time I was writing a paper on walking simulators and was listening to an autobiographical audiobook and therefore decided instead of having data driven meshes I would model each mesh with a significant/interesting place in my life. In this conception of my project a player could walk up to a multi coloured mesh and a sort of audio log (my voice) would start talking through some moment I experienced in the place. For instance, I modelled and wrote a little excerpt about the cubicles where my dad worked in the basement of the old Art Gallery of Alberta. I think it was sort of interesting because of how abstractly the place was modelled ( an array of squares with certain faces missing more or less) so the whole experience became sort of like a book in the sense that there was no clear representation of the text, but there was still some sense or experience of immersive space. However in the end I didn’t end up pursing the idea as: the models and writing were taking a ton of time to write in and of themselves; I was a little self conscious if these pretty mundane stories would even be interesting; the lack of lighting/texturing/proper z buffering made it was hard to understand more complex spaces; I could never get relative rotations working properly so it became impossible to elegantly traverse and explore these scenes as a player.

This lead to me committing to the technically oriented project which I had. In deciding to scrap adding any other significant technical/narrative/conceptual elements I tried to find the things throughout my graphics programming journey which I found most interesting. In a typical 3D rendering scene the programmer has to manually cull the scene so that meshes behind the camera are not drawn to the screen, my own implementation worked in the same way so that naturally the program drew objects which were technically behind the player. By taking out culling this lead to a interesting phenomena by which walking through an object no longer lead to the increasing size of the mesh followed by its disappearance as you passed through it but rather its reversal (as now you could see its back side) and shrinking (as now you were walking away from it). Since rotations didn’t work properly and player movement was axis-aligned (w always increased the player’s z value, irrespective of the direction they were facing) I allowed players to rotate the camera temporarily by clicking and dragging the mouse, the affect of turning a virtual head when you have a full 360 degree view is unexpected visually and hopefully interesting to try to understand. I also gave the mouse some attractive force over the meshes’ vertexes and gave it some pseudo lighting properties to make the whole 360 view sphere feel sort of like a toy that you could play with.
