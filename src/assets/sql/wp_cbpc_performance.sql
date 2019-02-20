-- phpMyAdmin SQL Dump
-- version 3.3.8.1
-- http://www.phpmyadmin.net
--
-- 主机: w.rdc.sae.sina.com.cn:3307
-- 生成日期: 2017 年 01 月 08 日 22:36
-- 服务器版本: 5.6.23
-- PHP 版本: 5.3.3

-- 姓名，部门，得分，用户身份，是否领导评分，活动id，投票日期,提交时间
CREATE TABLE
IF NOT EXISTS tbl_cbpc_performance
(
  id int
(11) NOT NULL AUTO_INCREMENT,
  `user` varchar
(20) NOT NULL,
  dpt varchar
(20) NOT NULL,
  score int
(11) NOT NULL,
  userType varchar
(20) NOT NULL,
  isGM int
(11) NOT NULL,
  sportId int
(11) NOT NULL,
  voteDate varchar
(20) NOT NULL,
  voteTime varchar
(20) NOT NULL,
  PRIMARY KEY
(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
