module Public::HtmlHelper
  def body_data
    stimulus_controller_name = "#{controller_path.gsub('/', '--')}--#{action_name}"

    {
      controller: stimulus_controller_name
    }
  end
end
