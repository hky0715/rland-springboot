package kr.co.rland.web.socket.config;

import java.util.List;
import java.util.ArrayList;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class ChatWebSocketHandler extends TextWebSocketHandler {
    List<WebSocketSession> users = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        users.add(session);
        System.out.println("connected from " + session.getRemoteAddress());

        session.sendMessage(new TextMessage("Hello!"));
    }
    
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        // message를 user들에게 보내면 broadcasting, 일부 그룹에게만 보내면 multicasting이 되지~
        message.getPayload();
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        users.remove(session);
        System.out.println("closed from " + session.getRemoteAddress());
    }

}
