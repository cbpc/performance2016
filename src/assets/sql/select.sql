--��Ա������
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

--�����ֲ�
SELECT
	a.userType,
	a.`user` as username,
	a.dpt,
	sum(case when score=3 then 1 else 0 end) ����ְ,
	sum(case when score=5 then 1 else 0 end) ������ְ,
	sum(case when score=7 then 1 else 0 end) ��ְ,
	sum(case when score=8 then 1 else 0 end) ����,
	sum(case when score=10 then 1 else 0 end) ����,
	count(*) ��Ʊ��
FROM
	wp_cbpc_performance AS a
WHERE
	sportid = 1
GROUP BY
	a.userType,
	a.`user`,
	a.dpt
order by 1
