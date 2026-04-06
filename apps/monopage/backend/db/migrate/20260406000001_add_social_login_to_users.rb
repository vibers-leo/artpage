class AddSocialLoginToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :provider, :string       # kakao / naver / google
    add_column :users, :uid, :string            # 각 플랫폼 고유 ID
    add_column :users, :name, :string          # 소셜에서 가져온 이름
    add_column :users, :avatar_url, :string    # 프로필 이미지

    # 이메일 없이 소셜로만 가입 가능하도록 (kakao는 이메일 선택동의)
    change_column_null :users, :email, true
    change_column_null :users, :password_digest, true

    add_index :users, [:provider, :uid], unique: true
  end
end
