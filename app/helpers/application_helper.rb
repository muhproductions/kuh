module ApplicationHelper

  def cp(path)
    'active' if current_page?(path)
  end

  def logged_in?
    !!session[:user_id]
  end

end
