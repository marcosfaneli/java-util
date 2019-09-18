/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.exemploswing;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Toolkit;
import java.net.URL;
import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JWindow;

/**
 *
 * @author marcos.faneli
 */
public class SplashScreen extends JWindow {

    private final Integer duration;

    public SplashScreen(Integer duration) {
        this.duration = duration;
    }

    public void showSplash() {
        JPanel content = (JPanel) getContentPane();
        content.setBackground(Color.white);

        // Configura a posição e o tamanho da janela
        int width = 150;
        int height = 100;

        Dimension screen = Toolkit.getDefaultToolkit().getScreenSize();
        int x = (screen.width - width) / 2;
        int y = (screen.height - height) / 2;

        setBounds(x, y, width, height);
        
        URL url = getClass().getResource("/logo.png");
        JLabel img = new JLabel(new ImageIcon(url));

        content.add(img, BorderLayout.CENTER);
        
        JLabel copyrt = new JLabel("Copyright 2019, Faneli", JLabel.CENTER);
        copyrt.setFont(new Font("Sans-Serif", Font.PLAIN, 12));

        content.add(copyrt, BorderLayout.SOUTH);

        content.setBorder(BorderFactory.createLineBorder(new Color(156, 20, 20, 0), 10));

        setVisible(true);

        // Espera ate que os recursos estejam carregados
        try {
            Thread.sleep(duration);
        } catch (InterruptedException e) {
        }

        setVisible(false);
    }

    public void showSplashAndExit() {
        showSplash();
        System.exit(0);
    }

}
