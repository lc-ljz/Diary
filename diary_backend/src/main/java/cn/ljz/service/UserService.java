package cn.ljz.service;

import cn.ljz.model.dto.UserLoginDTO;
import cn.ljz.model.vo.UserLoginVO;

public interface UserService {

    UserLoginVO login(UserLoginDTO userLoginDTO);

}
