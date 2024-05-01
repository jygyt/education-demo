package com.yunzainfo.education.controller.web;

import com.yunzainfo.education.entity.result.ResultData;
import org.springframework.boot.system.ApplicationHome;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/upload")
public class UploadController {
    /**
     * 上传文件方法
     *
     * @param file 要上传的文件
     * @return 返回上传结果
     */
    @PostMapping("/upload")
    public ResponseEntity upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResultData.okData("空文件"); // 如果文件为空，则返回提示信息"未上传文件"
        }
        String originalFilename = file.getOriginalFilename(); // 获取原始文件名
        String ext='.' + originalFilename.split("\\.")[1]; // 获取文件扩展名
        String uuid = UUID.randomUUID().toString().replace("-", ""); // 生成随机UUID
        String newFileName = uuid + ext; // 新文件名

        // 上传图片
        //ApplicationHome applicationHome = new ApplicationHome(this.getClass()); // 获取应用程序的根目录
//        String pre = applicationHome.getDir().getParentFile().getParentFile().getAbsolutePath() +
//                "\\src\\main\\resources\\static\\images\\"; // 设置图片存储路径
        ApplicationHome applicationHome = new ApplicationHome(this.getClass()); // 获取应用程序的根目录
        String path = applicationHome.getDir().getAbsolutePath();
        String pre = path.split("wwwroot")[0]+"work/img/";
        String newPath = pre + newFileName; // 图片完整路径
        try{
            file.transferTo(new File(newPath)); // 将文件保存到指定路径
        } catch (IOException e){
            e.printStackTrace(); // 打印异常信息
        }


        return ResultData.okData(newFileName); // 返回上传成功信息
    }

    @GetMapping("/getPath")
    public ResponseEntity getPath() {

        // 上传图片
        ApplicationHome applicationHome = new ApplicationHome(this.getClass()); // 获取应用程序的根目录
//        String pre = applicationHome.getDir().getParentFile().getParentFile().getAbsolutePath() +
//                "\\src\\main\\resources\\static\\images\\"; // 设置图片存储路径


        return ResultData.okData(applicationHome.getDir().getAbsolutePath()); // 返回上传成功信息
    }

    @GetMapping("/download/{name}")
    public void download(@PathVariable String name, HttpServletResponse response){
        ApplicationHome applicationHome = new ApplicationHome(this.getClass()); // 获取应用程序的根目录
        String path = applicationHome.getDir().getAbsolutePath();
        try{
            //输入流，通过输入流读取文件内容
            FileInputStream fileInputStream = new FileInputStream(new File(path.split("wwwroot")[0]+"work/img/"+name));
            //输出流，通过输出流将文件写回浏览器，在浏览器展示图片
            ServletOutputStream outputStream = response.getOutputStream();
            //下载文件：需要设置消息头
            //MIME类型,这里为二进制文件（任意文件类型都可）
            response.addHeader("content-Type","application/octet-stream");
            //attachement为附件，以附件方式获取要下载的文件，filename指定具体文件，包含了文件后缀：abc.txt
            response.addHeader("content-Disposition","attachement;filename="+name);


            int len = 0;
            byte[] bytes = new byte[1024];
            while((len = fileInputStream.read(bytes))!= -1){
                outputStream.write(bytes,0,len);
                outputStream.flush();
            }
            //关闭资源
            outputStream.close();
            fileInputStream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
