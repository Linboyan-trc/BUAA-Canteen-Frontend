import http from "@/utils/http";

// 登录
export const login = ({email, password}) => {
    return http({
        url: 'user/login/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email,
            password
        }
    })
}

export const getUserInfo = () => {
    return http({
        url: 'user/get-info',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const getUserActionInfo = () => {
    return http({
        url: 'user/get-user-action-info',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const refreshAccessToken = (refreshToken) => {
  return http.post('/user/refresh-token', {}, {
    headers: {
      Authorization: `Bearer ${refreshToken.refresh_token}`,
    }
  });
};


// 注册
export const register = ({email, username, password}) => {
    return http({
        url: 'user/register/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            username,
            password,
            email
        }
    })
}

//登出
export const logout = () => {
    return http({
        url: 'user/logout/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

//注销账号
export const deleteAccount = ({}) => {
    return http({
        url: 'user/delete/',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

//更新用户信息（文本）
export const updateUserInfo = ({username, email, gender, introduction}) => {
    return http({
        url: '/user/change-info',
        method: 'PUT',
        data: {
            username: username,
            email: email,
            gender: gender,
            introduction: introduction,
        }
    });
}

//更新用户头像
export const updateUserAvatar = ({avatar}) => {
    return http({
        url: '/user/change-avatar',
        method: 'POST',
        data: {
            avatar: avatar
        }
    })
}

//更新用户密码
export const updateUserPassword = ({oldPassword, newPassword}) => {
    return http({
        url: '/user/change-password',
        method: 'POST',
        data: {
            old_password: oldPassword,
            new_password: newPassword
        }
    })
}