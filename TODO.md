# Todo

A few things weren't implemented due to various constraints (including time):

 * util/domutil: Shouldn't really exist. We should use jQuery or something.
 * util/domutil: Tests should exist for this class.
 * view/ball_element: There's potentially an edge case if we slightly glance off the top of the screen - we might consider the ball dead due to the shallow bounce.
 * view/ball_element: We assume the parent element is the window - it might not be
 * view/ball_element: We could cache container dimensions and listen for resize events, rather than checking every time
 * build: We don't minify css (or use sass). We could.
 * build: We should use JSLint to automatically check style of our scripts at build time.
 * build: We could generate sourcemaps for uglified JS