class GistsController < ApplicationController

  before_action :get_gist, only: [:show, :delete]

  def new
    @languages = CODEMIRROR[:modes]
  end
  def show; end

  def create

    snippets = params['gist']
    langs = params['lang']

    params = Array.new

    snippets.each_with_index do |s,i|
      params << {paste: s, lang: langs[i]}
    end

    body = { snippets: params}.to_json

    request = Typhoeus::Request.new(API+"/gists",
                                    method: :post,
                                    body: body)

    request.run

    id = JSON.parse(request.response.body)['gist']['uuid']
    time = request.response.total_time * 100

    time = time < 1 ? "#{(time * 1000).to_i} μs" : "#{time.to_i} ms"
    
    flash[:created] = {title: "Successfully created gist in #{time}",
                       id: id}
    redirect_to "/gists/#{id}", turbolinks: true
  end

  private

  def get_gist
    response = Typhoeus.get("#{API}/gists/#{params[:id]}")

    @gist = JSON.parse(response.response_body)
  end

end
