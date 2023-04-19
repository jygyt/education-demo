CREATE TABLE `access_token` (
  `id` char(36) NOT NULL COMMENT ''主键'',
  `access_token` char(36) DEFAULT NULL COMMENT ''token'',
  `gmt_create` bigint DEFAULT NULL COMMENT ''创建时间'',
  `last_access_time` bigint DEFAULT NULL COMMENT ''最后使用时间'',
  `max_inactive_interval` int DEFAULT NULL COMMENT ''保质期(秒)'',
  `expiry_time` bigint DEFAULT NULL COMMENT ''过期时间=最后时间+保质期'',
  `auth_id` varchar(36) DEFAULT NULL COMMENT ''账户ID'',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT=''鉴权表'';

CREATE TABLE `auth` (
  `id` char(36) NOT NULL COMMENT ''主键'',
  `account` varchar(64) DEFAULT NULL COMMENT ''账号'',
  `created_auth_id` varchar(255) DEFAULT NULL COMMENT ''创建人'',
  `level` tinyint DEFAULT NULL COMMENT ''等级/权限(0超级管理员,1管理员,2普通用户)'',
  `gmt_create` datetime DEFAULT NULL COMMENT ''创建时间'',
  `gmt_modified` datetime DEFAULT NULL COMMENT ''修改时间'',
  `password` varchar(64) DEFAULT NULL COMMENT ''密码'',
  `lock` tinyint DEFAULT ''0'' COMMENT ''帐号是否锁定(1锁定,0未锁定)'',
  `status_auth` tinyint DEFAULT ''0'' COMMENT ''是否删除 (0否,1是)'',
  `refresh_token` varchar(255) DEFAULT NULL COMMENT ''刷新token'',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT=''授权表'';
