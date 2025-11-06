# -*- coding: utf-8 -*-
"""
Created on Sun Apr 23 11:08:55 2023

@author: simok
"""
from random import*
import numpy as np
from tkinter import*
import webbrowser
from PIL import Image, ImageTk
import os, sys


window =Tk()

can=Canvas(window,width=800, height=800, bg='#CCCCCC')
can.delete(ALL)

ligne=18
colonne=10
score=0

for k in range(ligne):
    h=k*800/ligne
    can.create_line(0, h, 400, h)
for k in range(colonne+1):
    h=k*400/colonne
    can.create_line(h, 0, h, 1000)
matrice=np.zeros(shape=(ligne,colonne),dtype=int)
def bloc(y,x,color):
    can.create_rectangle(x*400/colonne+1,y*800/ligne+1,(x+1)*400/colonne,(y+1)*800/ligne,fill=color,outline='')

def open_url(event):
    webbrowser.open("selim-mokobodzki.com")


def resource_path(relative_path):
    """Get absolute path to resource, works for dev and for PyInstaller."""
    try:
        # When the app is bundled by PyInstaller, it stores files in a temp folder
        base_path = sys._MEIPASS
    except Exception:
        # When running normally
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)


img = Image.open(resource_path("Go Back to Portfolio.png"))
img = img.resize((100, 50))  # Resize as needed
photo = ImageTk.PhotoImage(img)
portfolio = can.create_image(35, 5, image=photo)
can.coords(portfolio, 500, 100)
can.tag_bind(portfolio, "<Button-1>", open_url)
can.image = photo


def iteration():
    step()
    can.after(250,iteration)

create=can.create_text(600,500,text="Created with Python and Microsoft Paint")
Selim=can.create_text(600,520,text="Selim Mokobodzki - 2023")


txtscore=can.create_text(600,400,text="Score: "+str(score))

stop=0
    
def step():
    global stop
    
    liste=[]
    for l in range(ligne-1,-1,-1):
        for c in range(colonne):

            if matrice[l, c]==1:

                liste.append([l,c])
                
                if l==ligne-1:

                    stop=1
                else:
                    if  matrice[l+1, c]==2: 
                        stop=1
                        
                
                    
    
        
    if stop==0:
        for k in liste:
            bloc(k[0],k[1],'#CCCCCC')
            bloc(k[0]+1,k[1],'red')
            matrice[k[0],k[1]]=0
            matrice[k[0]+1,k[1]]=1 
    else:
        stop=0
        atterissage(liste)
        
        figure_pop()          
                
def figure_pop():
    figure=int(random()*7)
    if figure==0:
        matrice[0,7]=1
        matrice[0,6]=1
        matrice[0,8]=1
        matrice[0,9]=1
    if figure==1:
        matrice[0,8]=1
        matrice[0,7]=1
        matrice[1,8]=1
        matrice[0,9]=1
    if figure==2:
        matrice[0,6]=1
        matrice[0,7]=1
        matrice[1,6]=1
        matrice[1,7]=1
    if figure==3:
        matrice[0,7]=1
        matrice[0,8]=1
        matrice[1,7]=1
        matrice[0,9]=1
    if figure==4:
        matrice[0,6]=1
        matrice[0,7]=1
        matrice[1,7]=1
        matrice[1,8]=1
    if figure==5:
        matrice[1,6]=1
        matrice[1,7]=1
        matrice[0,8]=1
        matrice[0,7]=1
    if figure==6:
        matrice[0,9]=1
        matrice[0,7]=1
        matrice[1,9]=1
        matrice[0,8]=1

figure_pop()

def atterissage(liste):
    global score
    for k in liste:
        bloc(k[0],k[1],'#808080')
        matrice[k[0],k[1]]=2


    alerte=0
    for k in liste:
        somme=0
        for a in range(colonne):
            somme+=matrice[k[0],a]
            if somme==2*colonne:               
                alerte=1
    
    #can.itemconfigure(txtscore, text=score)        
    global txtscore
    print (txtscore)
    can.delete(txtscore)
    txtscore=can.create_text(600,400,text="Score: "+str(score)) 


    if alerte==1:
        completed=[]
        for l in range(ligne):
            somme=0
            for c in range(colonne):
                somme+=matrice[l,c]
                if somme==2*colonne:
                    completed.append(l)
        score+=len(completed)

        
        
        for l in completed:
            for k in range(l,1,-1):
                for c in range(colonne):
                    matrice[k,c]=matrice[k-1,c]

        for l in range(ligne):
            for c in range(colonne):
                if matrice[l, c]==2:
                    bloc(l,c,'#808080')
                if matrice[l,c]==0:
                    bloc(l,c,'#CCCCCC')

                
def f(event):
    t=event.keysym

    if t=='Left':
        liste=[]
        stop=0
        for l in range(ligne-1,-1,-1):
            for c in range(colonne):
                if matrice[l, c]==1:
                    liste.append([l,c])
                    if c==0:
                        stop=1
                    elif  matrice[l, c-1]==2: stop=1


        if stop==0:
            for k in liste:
                bloc(k[0],k[1]-1,'red')
                bloc(k[0],k[1],'#CCCCCC')
                
                matrice[k[0],k[1]]=0
                matrice[k[0],k[1]-1]=1 
        else:
            stop=0
        
    if t=='Right':
        liste=[]
        stop=0
        for l in range(ligne-1,-1,-1):
            for c in range(colonne-1,-1,-1):
                if matrice[l, c]==1:
                    liste.append([l,c])
                    if c==colonne-1:
                        stop=1
                    elif  matrice[l, c+1]==2: stop=1


        if stop==0:
            for k in liste:
                bloc(k[0],k[1],'#CCCCCC')
                bloc(k[0],k[1]+1,'red')
                matrice[k[0],k[1]]=0
                matrice[k[0],k[1]+1]=1 
            else:
                stop=0
      
        
    if t=='space':
        liste=[]


        for l in range(ligne-1,-1,-1):
            for c in range(colonne):
                if matrice[l, c]==1:
                    liste.append([l,c])
                    
                    
        rotation(liste) 
        
            
        
    
    if t=='Down':
        liste=[]
        stop=0
        for l in range(ligne-1,-1,-1):
            for c in range(colonne):

                if matrice[l, c]==1:
                    
                    liste.append([l,c])
                    
                    if l==ligne-1:

                        stop=1
                    else:
                        if  matrice[l+1, c]==2: 
                            stop=1
        if stop==0:
            bas=0
            for a in liste:
                matrice[a[0],a[1]]=0
                bloc(a[0],a[1],'#CCCCCC')
            while(bas==0):
                for a in liste:
                    
                    a[0]+=1
                    
                    if a[0]==ligne-1:
                        bas=1
                    else:
                        
                        if matrice[a[0]+1,a[1]]==2:
                            bas=1
            for a in liste:
                matrice[a[0],a[1]]=1

def rotation(liste):
    
        
    
    a,b= liste[0][0],liste[0][1]
        
    if (0<= a+(liste [1][1]-b)<ligne and 
        0<=b-(liste [1][0]-a)<colonne and
        0<=a+(liste [2][1]-b)<ligne and
        0<=b-(liste [2][0]-a)<colonne and
        0<=a+(liste [3][1]-b)<ligne and
        0<=b-(liste [3][0]-a)<colonne):
        
        if (matrice[a+(liste [1][1]-b), b-(liste [1][0]-a)]!=2 and
            matrice[a+(liste [2][1]-b), b-(liste [2][0]-a)]!=2 and
            matrice[a+(liste [3][1]-b), b-(liste [3][0]-a)]!=2):
        
            for k in liste: 
                bloc(k[0],k[1],'#CCCCCC')
                matrice[k[0],k[1]]=0         
             
    
            liste[1]=[a+(liste [1][1]-b), b-(liste [1][0]-a)]
            liste[2]=[a+(liste [2][1]-b), b-(liste [2][0]-a)]
            liste[3]=[a+(liste [3][1]-b), b-(liste [3][0]-a)]
           
            for k in liste:
                bloc(k[0],k[1],'red') 
                matrice[k[0],k[1]]=1

window.bind("<Key>", f)

iteration()
can.pack()
window.mainloop()