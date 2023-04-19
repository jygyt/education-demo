package com.yunzainfo.education.utils;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

import java.io.*;

public class FtpUtil {
    public static void sendToServerByFTP(String server, int port, String username, String password,

                                         String encoding, String fileLocalPath, String fileRemotePath, String fileRemoteName) throws IOException {

// 获取 FTPClient

        FTPClient ftpClient = new FTPClient();

        ftpClient.connect(server, port);

        ftpClient.login(username, password);

        int replyCode = ftpClient.getReplyCode();

        if (!FTPReply.isPositiveCompletion(replyCode)) {

            System.out.println("connected failed");

        }

// 设置编码，当文件中存在中文且上传后文件乱码时可使用此配置项

//ftpClient.setControlEncoding(encoding);

// 切换为本地被动模式，可以解决FTP上传后文件为空的问题，但需要服务器将FTP服务添加至防火墙白名单

//ftpClient.enterLocalPassiveMode();

// 切换到指定目录

        ftpClient.changeWorkingDirectory(fileRemotePath);

// 获取文件并上传

        File file = new File(fileLocalPath);

        InputStream inputStream = new FileInputStream(file);

//文件名为中文名且上传后出现乱码时启用此项

//String fileName = new String(fileRemoteName.getBytes(encoding), "ISO8859-1");

        boolean flag = ftpClient.storeFile(fileRemoteName, inputStream);

// 关闭已占用资源

        inputStream.close();

        ftpClient.logout();

    }

    public void downloadFile(String server, int port, String username, String password,

                             String serverPath, String localPath, String fileName) throws IOException {

// 登录

        FTPClient ftpClient = new FTPClient();

        ftpClient.connect(server, port);

        ftpClient.login(username, password);

// 验证登录情况

        int replyCode = ftpClient.getReplyCode();

        if (!FTPReply.isPositiveCompletion(replyCode)) {

            throw new RuntimeException("登录FTP服务器失败，错误代码：" + replyCode);

        }

// 切换服务器至目标目录

        ftpClient.changeWorkingDirectory(serverPath);

// 下载文件

        File file = new File(localPath);

        FileOutputStream fileOutputStream = new FileOutputStream(file);

        ftpClient.retrieveFile(fileName, fileOutputStream);

// 关闭资源占用

        fileOutputStream.close();

        ftpClient.logout();

    }

    public void deleteFile(String server, int port, String username, String password,

                           String serverPath, String fileName) throws IOException {

// 登录

        FTPClient ftpClient = new FTPClient();

        ftpClient.connect(server, port);

        ftpClient.login(username, password);

// 验证登录情况

        int replyCode = ftpClient.getReplyCode();

        if (!FTPReply.isPositiveCompletion(replyCode)) {

            throw new RuntimeException("登录FTP服务器失败，错误代码：" + replyCode);

        }

        ftpClient.changeWorkingDirectory(serverPath);

        ftpClient.deleteFile(fileName);

    }
}
