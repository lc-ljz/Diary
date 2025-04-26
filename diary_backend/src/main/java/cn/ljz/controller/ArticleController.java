package cn.ljz.controller;

import cn.ljz.model.Article;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/article")
public class ArticleController {


    @PostMapping ("/insert")
    public String sayHello(@RequestBody Article article) {
        System.out.println("Received article: " + article.getTitle());
        System.out.println("Received content: " + article.getContent());
        return "Hello: " + article.getTitle() + " - " + article.getContent();
    }

}
