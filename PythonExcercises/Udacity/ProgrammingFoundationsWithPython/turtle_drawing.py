import turtle

def draw_square():
    window = turtle.Screen()
    window.bgcolor("#000000")

    myTurtle = turtle.Turtle()
    myTurtle.shape("turtle")
    myTurtle.color("#00cc00")
    sides = 4
    for s in range(sides):
        if (s%2 == 0):
            myTurtle.speed(1)
        else:
            myTurtle.speed(5)
        myTurtle.forward(100)
        myTurtle.right(90)

    angie = turtle.Turtle()
    angie.shape("classic")
    angie.color("#00ccff")
    angie.circle(100)
    
    window.exitonclick()

draw_square()
