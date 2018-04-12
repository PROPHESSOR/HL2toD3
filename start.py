from OpenGL.GL import *
from OpenGL.GLU import *
from OpenGL.GLUT import *

import json

def readVertexesFromJSON():
    global vertexes

    file = open('background01.parsed')
    data = file.read()
    vertexes = json.loads(data)
    #print(vertexes[0])


def init():
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB)
    glutInitWindowSize(1024, 768)
    glutInitWindowPosition(50, 50)
    glutInit(sys.argv)
    glutCreateWindow(b"Simple visualizer!")
    glEnableClientState(GL_VERTEX_ARRAY)

def start():
    global xrot
    global yrot
    global scale
    global ambient
    global greencolor
    global treecolor
    global lightpos

    #global vertexes

    #vertexes = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

    xrot = 0.0
    yrot = 0.0
    scale = 1.0
    ambient = (1.0, 1.0, 1.0, 1) # rgb bright
    greencolor = (0.2, 0.8, 0.0, 0.8)
    treecolor = (0.9, 0.6, 0.3, 0.8)
    lightpos = (1.0, 1.0, 1.0)

    glClearColor(0.5, 0.5, 0.5, 1.0)
    gluOrtho2D(-1.0, 1.0, -1.0, 1.0) # Borders of draw layout
    glRotatef(-90, 1.0, 0.0, 0.0)
    glLightModelfv(GL_LIGHT_MODEL_AMBIENT, ambient)

    glEnable(GL_LIGHTING)
    glEnable(GL_LIGHT0)
    glLightfv(GL_LIGHT0, GL_POSITION, lightpos)


def keyboard(key, x, y):
    global xrot
    global yrot
    global scale

    if key == GLUT_KEY_UP:
        xrot -= 2.0
    if key == GLUT_KEY_DOWN:
        xrot += 2.0
    if key == GLUT_KEY_LEFT:
        yrot -= 2.0
    if key == GLUT_KEY_RIGHT:
        yrot += 2.0
    if key == 112:
        scale += 2.0
    if key == 114:
        scale -= 2.0

    #print key

    glutPostRedisplay() # repaint

def draw():
    global xrot
    global yrot
    global ambient
    global greencolor
    global treecolor
    global lightpos

    global vertexes

    glClear(GL_COLOR_BUFFER_BIT)
    glPushMatrix()
    glRotatef(xrot, 1.0, 0.0, 0.0)
    glRotatef(yrot, 0.0, 1.0, 0.0)
    glLightfv(GL_LIGHT0, GL_POSITION, lightpos)

    #glMaterialfv(GL_FRONT_AND_BACK, GL_DIFFUSE, treecolor)
    #glTranslatef(0.0, 0.0, -0.7)

    #glutSolidCylinder(0.1, 0.2, 20, 20)

    glMaterialfv(GL_FRONT_AND_BACK, GL_DIFFUSE, greencolor)
    #glTranslatef(0.0, 0.0, 0.2)

    #glutSolidCone(0.5, 0.5, 20, 20)
    #glTranslatef(0.0, 0.0, 0.3)

    #glutSolidCone(0.4, 0.4, 20, 20)
    #glTranslatef(0.0, 0.0, 0.3)

    #glutSolidCone(0.3, 0.3, 20, 20)

    glEnableClientState(GL_VERTEX_ARRAY)
    glVertexPointer(3, GL_FLOAT, 0, vertexes)
    glDrawArrays(GL_TRIANGLES, 0, len(vertexes))
    glDisableClientState(GL_VERTEX_ARRAY)

    glPopMatrix()
    glScale(scale, scale, scale)
    glutSwapBuffers()

readVertexesFromJSON()

init()

start()

glutDisplayFunc(draw)

glutSpecialFunc(keyboard)

glutMainLoop()
