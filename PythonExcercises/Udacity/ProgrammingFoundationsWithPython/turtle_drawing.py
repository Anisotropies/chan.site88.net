import turtle

window = turtle.Screen()
window.bgcolor("#000000")


def draw_square(turtleInst, offset):
    sides = 4
    turtleInst.right(offset)

    for s in range(sides):
        turtleInst.right(90)
        turtleInst.speed(10)
        turtleInst.forward(100)


def draw_square_circle(turtleInst, divisions):
    incrementAngle = 360/divisions
    r = 0
    g = 1.0
    b = 0
    for i in range(divisions):
        draw_square(turtleInst, incrementAngle)  
        r += divisions/255.0
        b += divisions/255.0
        
        if (r>1):
            r = 1
            b = 1
        
        turtleInst.color(r,g,b)


myTurtle = turtle.Turtle()
myTurtle.shape("turtle")


draw_square_circle(myTurtle,30)

window.exitonclick()

