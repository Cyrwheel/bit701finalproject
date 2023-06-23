package naver.cloud;

import org.springframework.web.multipart.MultipartFile;

public interface ObjectStorageService {
    //3개를 받는 인터페이스를 만들었다.
    public String uploadFile(String bucketName, String directoryPath, MultipartFile file);

    public void deleteFile(String bucketName, String directoryPath, String filename);


}
