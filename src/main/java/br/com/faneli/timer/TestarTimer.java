/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.timer;

import java.util.Timer;

/**
 *
 * @author marcos.faneli
 */
public class TestarTimer {

    public void testar() {
        Tarefa tarefa = new Tarefa();

        Timer timer = new Timer("Timer");

        long delay = 100L;
        timer.schedule(tarefa, delay);
    }
}
