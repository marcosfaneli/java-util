/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.thread;

import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 *
 * @author marcos.faneli
 */
public class T1 implements Runnable {

    @Override
    public void run() {
        for (int i = 0; i < 1000; i++) {
            System.out.println("Thread " + this.getClass().getName() + " as " + new SimpleDateFormat("dd-MM-yyyy hh:mm:ss:zzz").format(Calendar.getInstance().getTime()));
        }
    }    
}
