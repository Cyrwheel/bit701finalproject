package naver.cloud;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:/naver.properties")
@ConfigurationProperties(prefix ="ncp")
@Data
public class NaverConfig {
        //프로퍼티 파일에서 선언된 값중에서
        // ncp.*  이름으로 된 프로퍼티값을 받을필드선언
    
        private String accessKey; // accessKey를 받을변수
        private String secretKey; // secretKey를 받을변수
        private String regionName; // regionName를 받을변수
        private String endPoint; // endPoint를 받을변수

}
