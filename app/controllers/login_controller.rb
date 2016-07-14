class LoginController < ApplicationController

  layout 'material'

  def index;
    redirect_to '/' if session[:user_id]
  end

  def logout
    session[:user_id] = nil
    session[:user_name] = nil

    flash[:success] = 'Successfully logged out. See ya!'

    redirect_to :back
  end

  def login

    if params[:login]
      body = { username: params[:username], password: params[:password]}.to_json
      request = Typhoeus::Request.new(API+'/users/authorize',
                                      method: :post,
                                      body: body,
                                      headers: {'Content-Type': 'application/json'})
      request.on_complete do |response|
        if response.success?
          res = JSON.parse(response.body)
          p res
          session[:user_id] = res['user']['uuid']
          session[:user_name] = params[:username]
          flash[:success] = "Welcome back, #{session[:user_name]}"
        else
          flash[:error] = "Something went wrong. Please try again (HTTP #{response.code})"
        end
      end
      request.run
    elsif params[:register]
      body = { username: params[:username], password: params[:password]}.to_json
      request = Typhoeus::Request.new(API+'/users',
                                      method: :post,
                                      body: body,
                                      headers: {'Content-Type': 'application/json'})
      request.on_complete do |response|
        if response.success?
          res = JSON.parse(response.body)
          session[:user_id] = res['user']['uuid']
          session[:user_name] = res['user']['username']
          flash[:success] = "Welcome aboard #{session[:user_name]}"
        else
          flash[:error] = "Something went wrong. Please try again (HTTP #{response.code})"
        end
      end
      request.run

    end

    redirect_to :back
  end

  private

  def user_valid? user: nil, pass: nil
  end
end
