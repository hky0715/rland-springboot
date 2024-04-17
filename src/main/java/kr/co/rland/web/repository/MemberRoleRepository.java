package kr.co.rland.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.rland.web.entity.MemberRole;

@Mapper
public interface MemberRoleRepository {
    // null을 받으려면 Long~ 으로 해야함! long 안됨!
    List<MemberRole> findAllByMemberId(Long memberId);
}
