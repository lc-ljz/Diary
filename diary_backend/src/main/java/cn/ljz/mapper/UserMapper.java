package cn.ljz.mapper;

import cn.ljz.model.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Select("select * from user where name = #{name}")
    User getUserByName(String name);

}
