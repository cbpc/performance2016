--人员打分情况
select userType,username,dpt,sum(leader) leader,sum(other) other from (select userType,username,dpt,(case when isgm=1 then score else 0 end) leader,(case when isgm=0 then score else 0 end) other from (SELECT
	a.userType,
	a.`user` as username,
	a.dpt,
	a.isGM,
	round(avg(a.score),3) AS score
FROM
	wp_cbpc_performance AS a
WHERE
	sportid = 1
GROUP BY
	a.userType,
	a.`user`,
	a.dpt,
	a.isGM) t) t
group by userType,username,dpt order by 1,5 desc

--分数分布
SELECT
	a.userType,
	a.`user` as username,
	a.dpt,
	sum(case when score=3 then 1 else 0 end) 不称职,
	sum(case when score=5 then 1 else 0 end) 基本称职,
	sum(case when score=7 then 1 else 0 end) 称职,
	sum(case when score=8 then 1 else 0 end) 良好,
	sum(case when score=10 then 1 else 0 end) 优秀,
	count(*) 总票数
FROM
	wp_cbpc_performance AS a
WHERE
	sportid = 1
GROUP BY
	a.userType,
	a.`user`,
	a.dpt
order by 1
