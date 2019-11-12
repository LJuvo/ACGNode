-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2019-11-11 16:08:32
-- 服务器版本： 5.6.41
-- PHP 版本： 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `asdb`
--

-- --------------------------------------------------------

--
-- 表的结构 `as_address`
--

CREATE TABLE `as_address` (
  `Id` int(11) NOT NULL,
  `addressCode` varchar(255) DEFAULT NULL COMMENT '地址编号',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '地址名称',
  `info` text COMMENT '地址信息',
  `tel` varchar(255) DEFAULT NULL COMMENT '电话信息',
  `userCode` varchar(255) NOT NULL DEFAULT '' COMMENT '用户Code',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='地址信息表';

--
-- 转存表中的数据 `as_address`
--

INSERT INTO `as_address` (`Id`, `addressCode`, `name`, `info`, `tel`, `userCode`, `createTime`, `updateTime`) VALUES
(20, 'AR4655911171126', '真先生', '花笙记宁南户本32号', '136254629865', 'MA201834541160518181510', '2018-10-16 06:48:41', '2018-10-16 06:48:41');

-- --------------------------------------------------------

--
-- 表的结构 `as_billassess`
--

CREATE TABLE `as_billassess` (
  `Id` int(11) NOT NULL,
  `demandCode` varchar(255) DEFAULT NULL COMMENT '需求编号',
  `serveCode` varchar(255) DEFAULT NULL COMMENT '服务人员',
  `assessServe` longtext COMMENT '服务员评价',
  `assessCustom` longtext COMMENT '消费者评价',
  `assessFlag` varchar(255) NOT NULL DEFAULT '0' COMMENT '评价状态',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='单据评价';

-- --------------------------------------------------------

--
-- 表的结构 `as_billqueue`
--

CREATE TABLE `as_billqueue` (
  `Id` int(11) NOT NULL,
  `demandCode` varchar(255) DEFAULT NULL COMMENT '需求编号',
  `serveCode` varchar(255) DEFAULT NULL COMMENT '服务人员',
  `allotCode` varchar(255) DEFAULT NULL COMMENT '分配人员',
  `billFlag` varchar(255) DEFAULT NULL COMMENT '单据状态',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='单据队列';

-- --------------------------------------------------------

--
-- 表的结构 `as_debrand`
--

CREATE TABLE `as_debrand` (
  `Id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '品牌名称',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='设备品牌';

-- --------------------------------------------------------

--
-- 表的结构 `as_demand`
--

CREATE TABLE `as_demand` (
  `Id` int(11) NOT NULL,
  `demandCode` varchar(255) DEFAULT NULL COMMENT '需求编号',
  `describetion` longtext COMMENT '需求描述',
  `addressCode` varchar(255) DEFAULT NULL COMMENT '地址编号',
  `photoCode` varchar(255) DEFAULT NULL COMMENT '图片编号',
  `videoCode` varchar(255) DEFAULT NULL COMMENT '录像编号',
  `userCode` varchar(255) DEFAULT NULL COMMENT '用户Code',
  `supplyInfo` longtext COMMENT '其他留言',
  `personName` varchar(255) DEFAULT '' COMMENT '用户称呼',
  `demandFlag` varchar(255) NOT NULL DEFAULT '200' COMMENT '需求状态',
  `message` longtext COMMENT '补充信息',
  `repairCode` varchar(255) DEFAULT NULL COMMENT '维修人员Code',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='需求表';

--
-- 转存表中的数据 `as_demand`
--

INSERT INTO `as_demand` (`Id`, `demandCode`, `describetion`, `addressCode`, `photoCode`, `videoCode`, `userCode`, `supplyInfo`, `personName`, `demandFlag`, `message`, `repairCode`, `createTime`, `updateTime`) VALUES
(1, 'AC2294681171127MA201834541160518181510', '家家家里家里', 'AR4655911171126', 'UP31016611711278345411', NULL, 'MA201834541160518181510', '', '户本', '200', NULL, NULL, '2018-10-16 06:48:41', '2018-10-16 06:48:41');

-- --------------------------------------------------------

--
-- 表的结构 `as_demodel`
--

CREATE TABLE `as_demodel` (
  `Id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '型号名',
  `brandname` varchar(255) DEFAULT NULL COMMENT '品牌名',
  `moldname` varchar(255) DEFAULT NULL COMMENT '类型名',
  `timename` varchar(255) DEFAULT NULL COMMENT '服务期',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='设备型号';

-- --------------------------------------------------------

--
-- 表的结构 `as_demodeluser`
--

CREATE TABLE `as_demodeluser` (
  `Id` int(11) NOT NULL,
  `modelName` varchar(255) DEFAULT NULL COMMENT '型号名称',
  `userCode` varchar(255) DEFAULT NULL COMMENT '用户ID',
  `buyTime` date NOT NULL DEFAULT '0000-00-00' COMMENT '购买时间',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户设备表';

-- --------------------------------------------------------

--
-- 表的结构 `as_demold`
--

CREATE TABLE `as_demold` (
  `Id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '类型名',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='设备类型';

-- --------------------------------------------------------

--
-- 表的结构 `as_detime`
--

CREATE TABLE `as_detime` (
  `Id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '服务期名',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='设备服务期';

-- --------------------------------------------------------

--
-- 表的结构 `as_menuinfo`
--

CREATE TABLE `as_menuinfo` (
  `Id` int(11) NOT NULL,
  `menuCode` varchar(255) DEFAULT NULL COMMENT '菜单Code',
  `menuName` varchar(255) DEFAULT NULL COMMENT '菜单名',
  `menuUrl` varchar(255) DEFAULT NULL COMMENT '菜单地址',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='菜单信息表';

-- --------------------------------------------------------

--
-- 表的结构 `as_operaterecord`
--

CREATE TABLE `as_operaterecord` (
  `Id` int(11) NOT NULL,
  `recordName` varchar(255) DEFAULT NULL COMMENT '操作名称',
  `recordInfo` longtext COMMENT '操作内容',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='操作记录表';

-- --------------------------------------------------------

--
-- 表的结构 `as_photopool`
--

CREATE TABLE `as_photopool` (
  `Id` int(11) NOT NULL,
  `photoCode` varchar(255) DEFAULT NULL COMMENT '图片编号',
  `photoUrl` varchar(255) DEFAULT '' COMMENT '图片地址',
  `userCode` varchar(255) DEFAULT NULL COMMENT '用户Code',
  `imgFlag` varchar(255) NOT NULL DEFAULT '200' COMMENT '图片Flag',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='图片池';

--
-- 转存表中的数据 `as_photopool`
--

INSERT INTO `as_photopool` (`Id`, `photoCode`, `photoUrl`, `userCode`, `imgFlag`, `createTime`, `updateTime`) VALUES
(1, 'UP413997101615078244310', '/upload/2018/10/201810112909525203.gif', 'MA2018244310167690671455', '200', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(2, 'UP48252911711248345411', '/upload/2018/10/201810559413641087.jpg', 'MA201834541160518181510', '200', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(3, 'UP48252911711248345411', '/upload/2018/10/201810048819359413.jpg', 'MA201834541160518181510', '200', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(4, 'UP31016611711278345411', '/upload/2018/10/201810233879886768.jpg', 'MA201834541160518181510', '200', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(5, 'UP31016611711278345411', '/upload/2018/10/201810340405127404.jpg', 'MA201834541160518181510', '200', '2018-10-16 06:48:41', '2018-10-16 06:48:41');

-- --------------------------------------------------------

--
-- 表的结构 `as_suggest`
--

CREATE TABLE `as_suggest` (
  `Id` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL COMMENT '姓名',
  `userTel` varchar(255) DEFAULT NULL COMMENT '用户手机号',
  `content` text COMMENT '建议内容',
  `userCode` varchar(255) DEFAULT NULL COMMENT '用户ID',
  `flag` varchar(255) NOT NULL DEFAULT '0' COMMENT '状态',
  `message` text NOT NULL COMMENT '留言',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='建议表';

-- --------------------------------------------------------

--
-- 表的结构 `as_typemenu`
--

CREATE TABLE `as_typemenu` (
  `Id` int(11) NOT NULL,
  `userTypeCode` varchar(255) DEFAULT NULL COMMENT '用户类型Code',
  `menuCode` varchar(255) DEFAULT NULL COMMENT '菜单Code',
  `info` varchar(255) NOT NULL DEFAULT '0',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='类型菜单表';

-- --------------------------------------------------------

--
-- 表的结构 `as_user`
--

CREATE TABLE `as_user` (
  `Id` int(11) NOT NULL,
  `userName` varchar(12) DEFAULT NULL COMMENT '用户名',
  `userPass` varchar(20) NOT NULL DEFAULT '123456' COMMENT '用户密码',
  `userTel` varchar(11) DEFAULT NULL COMMENT '手机号',
  `userWx` varchar(255) DEFAULT '' COMMENT '用户微信',
  `token` varchar(255) DEFAULT NULL COMMENT '验证',
  `wxToken` varchar(255) DEFAULT NULL COMMENT '微信token',
  `userCode` varchar(255) DEFAULT NULL COMMENT '用户统一ID',
  `userTypeCode` varchar(255) NOT NULL DEFAULT '0' COMMENT '用户类型Code',
  `userFlag` varchar(5) NOT NULL DEFAULT '0' COMMENT '用户状态',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户表';

--
-- 转存表中的数据 `as_user`
--

INSERT INTO `as_user` (`Id`, `userName`, `userPass`, `userTel`, `userWx`, `token`, `wxToken`, `userCode`, `userTypeCode`, `userFlag`, `createTime`, `updateTime`) VALUES
(25, NULL, '132', '01213456789', '', 'eyJkYXRhIjp7InVzZXJDb2RlIjoiTUEyMDE4MjQ0MzEwMTY3NjkwNjcxNDU1In0sImNyZWF0ZWQiOjE1Mzk2NzM5OTUsImV4cCI6NjAwfQ==.GOolFmXpdZ1Wb1ZhOsOtkEl2YcPG+dgqBRpTXp1tnFk=', NULL, 'MA2018244310167690671455', '0', '0', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(26, NULL, '132', '01213456788', '', 'eyJkYXRhIjp7InVzZXJDb2RlIjoiTUEyMDE4ODY3NzEwMTYwMjkzODIxNTIwIn0sImNyZWF0ZWQiOjE1NDE2NTYyNjYsImV4cCI6NjAwfQ==.Wi5roRokBWwlc5bYLiXtyq8IWn/0MAXZ32lAfKtvPDg=', NULL, 'MA2018867710160293821520', '101', '0', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(27, NULL, '123', '01234567890', '', 'eyJkYXRhIjp7InVzZXJDb2RlIjoiTUEyMDE4MzQ1NDExNjA1MTgxODE1MTAifSwiY3JlYXRlZCI6MTU0MTU2MTcyMiwiZXhwIjo2MDB9.nsNRtZHAG+sCEdaJ7qRvMRUnH2igLxqX/PXi5bisxJU=', NULL, 'MA201834541160518181510', '0', '0', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(28, NULL, 'rhy800522', '13699462999', '', 'eyJkYXRhIjp7InVzZXJDb2RlIjoiTUEyMDE4OTMwMjExNjM2ODExMTE1MTMifSwiY3JlYXRlZCI6MTU0MTQ4ODQ1OSwiZXhwIjo2MDB9.pSVVAOP9Zt1ufgRezLZUYeI03r9IIDOv4bLgYAUtY3E=', NULL, 'MA201893021163681111513', '0', '0', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(29, NULL, '123456', '18108197129', '', 'eyJkYXRhIjp7InVzZXJDb2RlIjoiTUEyMDE5OTI1NzAzMjMxMTEzMDE2MTIifSwiY3JlYXRlZCI6MTU1MTc2MDQ2OCwiZXhwIjo2MDB9.ZSqzjXonRAIS2P4b7ntoxILu4hiTF4i5/awscYGJrbo=', NULL, 'MA201992570323111301612', '0', '0', '2018-10-16 06:48:41', '2018-10-16 06:48:41');

-- --------------------------------------------------------

--
-- 表的结构 `as_userlog`
--

CREATE TABLE `as_userlog` (
  `Id` int(11) NOT NULL,
  `userCode` varchar(255) DEFAULT NULL COMMENT '用户统一ID',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='登录记录';

--
-- 转存表中的数据 `as_userlog`
--

INSERT INTO `as_userlog` (`Id`, `userCode`, `createTime`, `updateTime`) VALUES
(1, 'MA2018244310167690671455', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(2, 'MA2018244310167690671455', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(3, 'MA2018244310167690671455', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(4, 'MA2018244310167690671455', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(5, 'MA2018867710160293821520', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(6, 'MA2018867710160293821520', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(7, 'MA201834541160518181510', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(8, 'MA201834541160518181510', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(9, 'MA201893021163681111513', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(10, 'MA201834541160518181510', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(11, 'MA201834541160518181510', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(12, 'MA201834541160518181510', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(13, 'MA2018867710160293821520', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(14, 'MA2018867710160293821520', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(15, 'MA201992570323111301612', '2018-10-16 06:48:41', '2018-10-16 06:48:41'),
(16, 'MA201992570323111301612', '2018-10-16 06:48:41', '2018-10-16 06:48:41');

-- --------------------------------------------------------

--
-- 表的结构 `as_userservelog`
--

CREATE TABLE `as_userservelog` (
  `Id` int(11) NOT NULL,
  `userCode` varchar(255) DEFAULT NULL COMMENT '用户统一ID',
  `did` text COMMENT '事件',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='服务记录';

-- --------------------------------------------------------

--
-- 表的结构 `as_usertype`
--

CREATE TABLE `as_usertype` (
  `Id` int(11) NOT NULL,
  `userTypeCode` varchar(255) DEFAULT NULL COMMENT '用户类型Code',
  `userType` varchar(255) DEFAULT NULL COMMENT '用户类型',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户类型表';

--
-- 转储表的索引
--

--
-- 表的索引 `as_address`
--
ALTER TABLE `as_address`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_billassess`
--
ALTER TABLE `as_billassess`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_billqueue`
--
ALTER TABLE `as_billqueue`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_debrand`
--
ALTER TABLE `as_debrand`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_demand`
--
ALTER TABLE `as_demand`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_demodel`
--
ALTER TABLE `as_demodel`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_demodeluser`
--
ALTER TABLE `as_demodeluser`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_demold`
--
ALTER TABLE `as_demold`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_detime`
--
ALTER TABLE `as_detime`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_menuinfo`
--
ALTER TABLE `as_menuinfo`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_operaterecord`
--
ALTER TABLE `as_operaterecord`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_photopool`
--
ALTER TABLE `as_photopool`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_suggest`
--
ALTER TABLE `as_suggest`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_typemenu`
--
ALTER TABLE `as_typemenu`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_user`
--
ALTER TABLE `as_user`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_userlog`
--
ALTER TABLE `as_userlog`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_userservelog`
--
ALTER TABLE `as_userservelog`
  ADD PRIMARY KEY (`Id`);

--
-- 表的索引 `as_usertype`
--
ALTER TABLE `as_usertype`
  ADD PRIMARY KEY (`Id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `as_address`
--
ALTER TABLE `as_address`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用表AUTO_INCREMENT `as_billassess`
--
ALTER TABLE `as_billassess`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_billqueue`
--
ALTER TABLE `as_billqueue`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_debrand`
--
ALTER TABLE `as_debrand`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_demand`
--
ALTER TABLE `as_demand`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `as_demodel`
--
ALTER TABLE `as_demodel`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_demodeluser`
--
ALTER TABLE `as_demodeluser`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_demold`
--
ALTER TABLE `as_demold`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_detime`
--
ALTER TABLE `as_detime`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_menuinfo`
--
ALTER TABLE `as_menuinfo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_operaterecord`
--
ALTER TABLE `as_operaterecord`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_photopool`
--
ALTER TABLE `as_photopool`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `as_suggest`
--
ALTER TABLE `as_suggest`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_typemenu`
--
ALTER TABLE `as_typemenu`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_user`
--
ALTER TABLE `as_user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- 使用表AUTO_INCREMENT `as_userlog`
--
ALTER TABLE `as_userlog`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 使用表AUTO_INCREMENT `as_userservelog`
--
ALTER TABLE `as_userservelog`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `as_usertype`
--
ALTER TABLE `as_usertype`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
