package cn.ljz.service.Impl;

import cn.ljz.exception.AccountLockedException;
import cn.ljz.exception.AccountNotFoundException;
import cn.ljz.exception.PasswordErrorException;
import cn.ljz.mapper.UserMapper;
import cn.ljz.model.dto.UserLoginDTO;
import cn.ljz.model.entity.User;
import cn.ljz.model.vo.UserLoginVO;
import cn.ljz.properties.JwtProperties;
import cn.ljz.service.UserService;
import cn.ljz.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private JwtProperties jwtProperties;

    @Override
    public UserLoginVO login(UserLoginDTO userLoginDTO) {

        User user = userMapper.getUserByName(userLoginDTO.getName());

        if(user==null){
            throw new AccountNotFoundException("账号不存在");
        }

        // 进行md5加密，然后再进行比对
        String password  = DigestUtils.md5DigestAsHex(userLoginDTO.getPassword().getBytes());

        if (!password.equals(user.getPassword())) {
            //密码错误
            throw new PasswordErrorException("密码错误");
        }

        if (user.getStatus() == 0) {
            //账号被锁定
            throw new AccountLockedException("账号被锁定");
        }

        //登录成功后，生成jwt令牌
        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("userId", user.getId());
        String token = JwtUtil.createJWT(
                jwtProperties.getAdminSecretKey(),
                jwtProperties.getAdminTtl(),
                claims
        );

        UserLoginVO userLoginVO = UserLoginVO.builder()
                .id(user.getId())
                .name(user.getName())
                .token(token)
                .build();

        return userLoginVO;
    }

}
