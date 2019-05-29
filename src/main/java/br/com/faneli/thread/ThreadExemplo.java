/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.thread;

/**
 *
 * @author marcos.faneli
 */
public class ThreadExemplo {
    int i = 0;
    public void testar() {
        T1 t1 = new T1();
        Thread a = new Thread(t1);
        a.start();
        
        T2 t2 = new T2();
        Thread b = new Thread(t2);
        b.start();
//        new Thread(t1).start();
//        new Thread(t2).start();
    }
 
    private void countMe(String name){
        i++;
        System.out.println("Current Counter is: " + i + ", updated by: " + name);
    }
 
    private final Runnable t1 = new Runnable() {
        @Override
        public void run() {
            try{
                for(int i=0; i<5; i++){
                    countMe("t1");
                }
            } catch (Exception e){}
 
        }
    };
 
    private final Runnable t2 = new Runnable() {
        @Override
        public void run() {
            try{
                for(int i=0; i<5; i++){
                    countMe("t2");
                }
            } catch (Exception e){}
       }
    };
}
