# Ball Question

This is an implementation of a 'bouncing balls' question.

Clicking on the window will spawn a ball at that location with a random velocity. If the ball hits a wall, it'll rebound (losing some of its speed in the process). When a ball loses enough of its Y velocity (and is just aimlessly trundling along the bottom), it'll be removed from the screen.

## Running the project

### Initial setup

To pull in all the dependencies, run:

```
npm install
```

### Developing

To build the project for development, you can run:

```
gulp build-dev
```

...which will wedge the final project into a ```dist/``` directory. If you want it to watch for changes and rebuild, you can run:

```
gulp watch
```

### Production

If you want to build this project for production, you can run:

```
gulp build-dist
```

...which will also do things like minifing the javascript.