/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.timer;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.TimerTask;

/**
 *
 * @author marcos.faneli
 */
public class Tarefa extends TimerTask{

    @Override
    public void run() {
        System.out.println("Executando tarefa as " + new SimpleDateFormat("dd-MM-yyyy hh:mm:ss:zzz").format(Calendar.getInstance().getTime()));
    }
    
}
