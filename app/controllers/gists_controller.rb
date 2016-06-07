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

    request = Typhoeus::Request.new(API+"/gists",
                                    method: :post,
                                    params: { snippets: params})

    request.run

    id = JSON.parse(request.response.body)['gist']['uuid']
    time = request.response.total_time * 100
    
    flash[:created] = {title: "Successfully created gist in #{time.to_i}ms",
                       id: id}
    redirect_to "/gists/#{id}"
  end

  private

  def get_gist
    response = Typhoeus.get("#{API}/gists/#{params[:id]}")
    @gist = JSON.parse(response.response_body)
  end

end
